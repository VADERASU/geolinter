import React, {Component} from "react";
import '../../styles/MapLinter.css';
import * as d3 from 'd3';

class OriginalMapD3 extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawMap = (d3MapInfo) => {
        const {scrollWidth, scrollHeight} = this.canvasRef.current;
        //const format = d3.format(".02f");
        console.log(d3MapInfo);

        // Chart dimensions
        let dimensions = {
            width: scrollWidth,
            height: scrollHeight,
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5, //60
            },
        };
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

        // init path and projection
        const projection = d3.geoAlbersUsa()
            .scale(600)
            //.center([0,20])
            .translate([dimensions.width / 2, dimensions.height / 2]);

        const path = d3.geoPath()
            .projection(projection);

        const colorScale = d3.scaleThreshold()
            .domain(d3MapInfo.breaks)
            .range(d3MapInfo.color_scheme);

        const svgRoot = d3.select(this.canvasRef.current).select("svg");
        const rootGroup = svgRoot.select('g#root-group');
        const mapGroup = rootGroup.append('g')
        .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

        const map = mapGroup.append('g')
        .selectAll('path')
        .data(d3MapInfo.geoJsonObj.features)
        .join('path')
        // draw polygons
        .attr('d', path)
        // set the colors
        .attr('fill', d => {
            let eduRate = d.properties.higher_education_rate;
            //console.log(eduRate);
            let color = eduRate !== 'unknown' ? colorScale(eduRate) : '#F3F8FB';
            return color;
        })

    };

    clearCanvas = () => {
        const rootGroup = d3.select(this.canvasRef.current).select('g#root-group');
        rootGroup.selectAll('g').remove();
    };

    mapDataProcess = (selectedCaseData, mapFeatureReady, selectRawCase) => {
        //console.log(mapFeatureReady);
        let d3MapInfo = {
            'geoJsonObj': selectedCaseData.geo,
            'max': selectedCaseData.features.max,
            'min': selectedCaseData.features.min,
            'breaks': mapFeatureReady.breaks,
            'color_scheme': mapFeatureReady.color_scheme,
            'projection': mapFeatureReady.projection,
            'background': mapFeatureReady.background,
            'stroke': mapFeatureReady.stroke,
            'stroke_width': mapFeatureReady.strokeWidth
        };
        return d3MapInfo;
    };

    componentDidMount = () => {
        let d3MapInfo = this.mapDataProcess(
            this.props.selectedCaseData,
            this.props.mapFeatureReady,
            this.props.selectRawCase
        );
        this.drawMap(d3MapInfo);
    };

    componentDidUpdate = () => {
        this.clearCanvas();
        let d3MapInfo = this.mapDataProcess(
            this.props.selectedCaseData,
            this.props.mapFeatureReady,
            this.props.selectRawCase
        );
        this.drawMap(d3MapInfo);
    };

    render(){
        return(
            <div style={{height: 300}} ref={this.canvasRef}>
                <svg
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <g id="root-group"/>
                </svg>
            </div>
        );
    }
}
export default OriginalMapD3;