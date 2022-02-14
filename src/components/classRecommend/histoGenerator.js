import React, {Component} from "react";
import * as d3 from 'd3';

class RecommendHistogram extends Component{
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawHistogram = (data, breaks, colorRange, maxVal, minVal) => {
        const {scrollWidth, scrollHeight} = this.canvasRef.current;
        const format = d3.format(".02f");

        const dataBins = d3.bin().thresholds(d3.thresholdFreedmanDiaconis)(data);

        // Chart dimensions
        let dimensions = {
            width: scrollWidth,
            height: scrollHeight-15,
            margin: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 5, //60
            },
        };
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

        const svgRoot = d3.select(this.canvasRef.current).select("svg");
        const rootGroup = svgRoot.select('g#root-group');
        const histGroup = rootGroup.append('g')
            .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

        /** setup scales */
        const xScale = d3.scaleLinear()
            .domain([dataBins[0].x0, dataBins[dataBins.length - 1].x1])
            .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataBins, d => d.length)]).nice()
            .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top]);

        const colorScale = d3.scaleThreshold().domain(breaks).range(colorRange);

        /** render bars for the hist */
        const barsGroup = histGroup.append('g').attr('class', 'bars');
        const bars = barsGroup.selectAll('rect')
        .data(dataBins)
        .join('rect')
        .attr('x', d => xScale(d.x0) + 1)
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("y", d => yScale(d.length))
        .attr("height", d => yScale(0) - yScale(d.length))
        .attr("fill", d => colorScale((d.x0+d.x1)/2));

        /** render breaker lines and color bins*/
        //TODO: Judge if break not exist - unclassed map
        const colorBinGroup = histGroup.append('g').attr('class', 'colorBins');
        const breakerLinesGroup = histGroup.append('g').attr('class', 'breakerLines');
        let colorBinList = [minVal];
        colorBinList = colorBinList.concat(breaks, maxVal);
        breaks.forEach((binBreak) => {
            const breakerLines = histGroup.append('line')
                .attr("x1", xScale(binBreak))  //<<== change your code here
                .attr("y1", 0)
                .attr("x2", xScale(binBreak))  //<<== and here
                .attr("y2", dimensions.height - dimensions.margin.top - dimensions.margin.bottom)
                .style("stroke-width", 1.5)
                .style("stroke", "darkgray")
                .style("fill", "none"); 
            
        });

        /** render color bins */
        //TODO: Add text annotation and marks with the calculation of color difference
        colorBinList.forEach((binBreak, i) => {
            if(i < colorBinList.length - 1){
                const colorBins = colorBinGroup.append('rect')
                    .attr('x', xScale(binBreak))
                    .attr('width', xScale(colorBinList[i+1])-xScale(binBreak))
                    .attr('y', dimensions.height + 3)
                    .attr('height', 5)
                    .attr('fill', colorScale(binBreak))
            }
        });

    };

    clearCanvas = () => {
        const rootGroup = d3.select(this.canvasRef.current).select('g#root-group');
        rootGroup.selectAll('g').remove();
    };

    extractFeatures = (propData) => {
        let colorRange = propData.colorRange;
        let k = colorRange.length;
        let feature = propData.feature;
        let data = propData.dataList;
        let breaks = feature[0].breaks;
        let maxVal = propData.maxVal;
        let minVal = propData.minVal;

        return {data, breaks, colorRange, maxVal, minVal};
    };

    componentDidMount() {
        let {data, breaks, colorRange, maxVal, minVal} = this.extractFeatures(this.props);
        this.drawHistogram(data, breaks, colorRange, maxVal, minVal);
    }

    componentDidUpdate() {
        this.clearCanvas();
        let {data, breaks, colorRange, maxVal, minVal} = this.extractFeatures(this.props);
        this.drawHistogram(data, breaks, colorRange, maxVal, minVal);
    }

    render(){
        return(
            <div style={{height: 49}} ref={this.canvasRef}> {/** 235px in 1080p */}
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
export default RecommendHistogram;