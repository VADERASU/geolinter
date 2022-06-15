import React, {Component} from "react";
import '../../styles/MapLinter.css';
import * as d3 from 'd3';

class OriginalMapD3 extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawMap = () => {
        const {scrollWidth, scrollHeight} = this.canvasRef.current;
        //const format = d3.format(".02f");

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
        const projection = d3.geoMercator()
            .scale(70)
            .center([0,20])
            .translate([dimensions.width / 2, dimensions.height / 2]);

        const path = d3.geoPath()
            .projection(projection);

        const colorScale = d3.scaleThreshold().domain(breaks).range(colorRange);

        const svgRoot = d3.select(this.canvasRef.current).select("svg");
        const rootGroup = svgRoot.select('g#root-group');
        const mapGroup = rootGroup.append('g')
        .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

    };

    clearCanvas = () => {
        const rootGroup = d3.select(this.canvasRef.current).select('g#root-group');
        rootGroup.selectAll('g').remove();
    };

    mapDataProcess = (selectedCaseData, vegaMapFeature, selectRawCase) => {
        
    };

    componentDidMount = () => {
        let selectedCaseData = this.props.selectedCaseData;
        let selectRawCase = this.props.selectRawCase;
        let vegaMapFeature = this.props.mapFeatureReady;
        //console.log(vegaMapFeature);
    };

    componentDidUpdate = () => {
        this.clearCanvas();
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