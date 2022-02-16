import React, {Component} from "react";
import ReactECharts from 'echarts-for-react';

class BarChartGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartOption: {}
        }
    }

    setEchartOption = (yAxisList, series) => {
        const options = {
            grid: { top: 3, right: 8, bottom: 22, left: 30 },
            yAxis: {
              type: 'category',
              data: yAxisList,
              //boundaryGap: false,
              axisLabel: {
                  fontSize: 10
              },
              axisLine: {show: false},
              axisTick: {show: false},
            },
            xAxis: {
              type: 'value',
              min: 0,
              max: 1,
              axisLabel: {
                fontSize: 10
            },
            axisLine: {show: false},
            axisTick: {show: true},
              //show:false,
            },
            series: series
        };

        //set the option
        this.setState({
            chartOption: options
        });
    };

    extractFeatures = (feature, ifMaxGVF) => {
        let yAxisList = ['GVF'];
        let GVFScore = feature[0].GVF;
        let series = [{
            name: 'GVF',
            type: 'bar',
            data: [{
                value: Math.round(GVFScore * 100) / 100,
                itemStyle: ifMaxGVF ? {color: 'green'} : {color: '#76ccd7'}
            }]
        }];

        return {yAxisList, series};
    };

    componentDidMount() {
        let feature = this.props.feature;
        let ifMaxGVF = this.props.ifMaxGVF;
        let {yAxisList, series} = this.extractFeatures(feature, ifMaxGVF);
        
        //console.log(this.extractFeatures(features));
        this.setEchartOption(yAxisList, series);
    }

    /** Update the canvas if props change */
    componentWillReceiveProps(nextProps, nextContext){
        let feature = nextProps.feature;
        let ifMaxGVF = nextProps.ifMaxGVF;
        let {yAxisList, series} = this.extractFeatures(feature, ifMaxGVF);
        
        //console.log(this.extractFeatures(features));
        this.setEchartOption(yAxisList, series);
    }

    render(){
        return(
           <div>
                <ReactECharts
                    option={this.state.chartOption} 
                    style={{height: 49, width: '100%'}}
                />               
           </div> 
        );
    }
}
export default BarChartGenerator;