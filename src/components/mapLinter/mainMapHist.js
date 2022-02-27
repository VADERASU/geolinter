import React, {Component} from "react";
import '../../styles/MapLinter.css';
import * as d3 from 'd3';

class MainMapHistogram extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawHistogram = (data, breaks, colorRange, maxVal, minVal) => {
        const {scrollWidth, scrollHeight} = this.canvasRef.current;
        const format = d3.format(".02f");
        /**
         * d3.thresholdSturges (used by default) is based on Sturges’s formula (1926)
         * perform poorly if n < 30 and data are not normally distributed.
         * These three generators implicitely assume a normal distribution. 
         * Scott’s normal reference rule is optimal for random samples of 
         * normally distributed data. Freedman–Diaconis’ choice is less sensitive 
         * than the standard deviation to outliers in data.
         */
        const dataBins = d3.bin().thresholds(d3.thresholdFreedmanDiaconis)(data);
        //console.log(dataBins);

        // Chart dimensions
        let dimensions = {
            width: scrollWidth,
            height: scrollHeight-60,
            margin: {
                top: 5,
                right: 40,
                bottom: 10,
                left: 20, //60
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
                    .attr('y', dimensions.height + 15)
                    .attr('height', 15)
                    .attr('fill', colorScale(binBreak));

                const colorText = colorBinGroup.append('text')
                    .attr('x', xScale(binBreak)-10)
                    .attr('y', dimensions.height+50)
                    .style('font-size', 12)
                    .text(i!==0 ? binBreak : "");
            }
        });
        //console.log(xScale(breaks[0].x1));
        //const colorBins = colorBinGroup.selectAll('rect')
        //.data(breaks)


        /** render x-axis */
        const xAxisGroup = histGroup.append('g')
        .attr("transform", `translate(0, ${dimensions.height - dimensions.margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(dimensions.width / 80 ).tickSizeOuter(0))
        .call(g => g.append("text")
            .attr("x", dimensions.width - dimensions.margin.right)
            .attr("y", -4)
            .attr("fill", "currentColor")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text(data.x));

        /** render y-axis */
        const yAxisGroup = histGroup.append('g')
        .attr("transform", `translate(${dimensions.margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(dimensions.height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y));

    };

    clearCanvas = () => {
        const rootGroup = d3.select(this.canvasRef.current).select('g#root-group');
        rootGroup.selectAll('g').remove();
    };

    extractFeatures = (propData) => {
        let data = this.props.selectedCaseData.features.data_list,
            breaks = this.props.vegaLiteSpec.encoding.color.scale.domain,
            colorRange = this.props.vegaLiteSpec.encoding.color.scale.range,
            maxVal = this.props.selectedCaseData.features.max,
            minVal = this.props.selectedCaseData.features.min;

        return {data, breaks, colorRange, maxVal, minVal};
    };

    componentDidMount() {
        if(this.props.selectedCaseData !== null){
            let dataFeatures = this.props.selectedCaseData.features;
            let {data, breaks, colorRange, maxVal, minVal} = this.extractFeatures(this.props);
            if(dataFeatures !== null ) {
             this.drawHistogram(data, breaks, colorRange, maxVal, minVal);
            }
        }
    }

    componentDidUpdate() {
        this.clearCanvas();
        if(this.props.selectedCaseData !== null){
            let dataFeatures = this.props.selectedCaseData.features;
            let {data, breaks, colorRange, maxVal, minVal} = this.extractFeatures(this.props);
            if(dataFeatures !== null ) {
             this.drawHistogram(data, breaks, colorRange, maxVal, minVal);
            }
        }
    }

    render(){
        return(
            <div style={{height: 150}} ref={this.canvasRef}> {/** 235px in 1080p */}
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
export default MainMapHistogram;