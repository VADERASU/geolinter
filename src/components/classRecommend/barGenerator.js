import React, {Component} from "react";
import ReactECharts from 'echarts-for-react';

class BarChartGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartOption: {}
        }
    }

    setEchartOption = (yAxisList, series, measure) => {
        const options = {
            grid: { top: 3, right: 8, bottom: 25, left:  (measure==="GVF")?30:50 },
            yAxis: {
              type: 'category',
              data: yAxisList,
              //boundaryGap: false,
              axisLabel: {
                  fontSize: 9
              },
              axisLine: {show: false},
              axisTick: {
                  show: false
                },
            },
            xAxis: {
              type: 'value',
              min: 0,
              max: (measure==="GVF") ? 1 : 0.6,
              axisLabel: {
                fontSize: 9,
                margin: 5
            },
            axisLine: {show: false},
            axisTick: {
                show: true,
                length: 2
            },
            splitNumber: (measure==="GVF") ? 5 : 2
              //show:false,
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b} Score: {c}'
            },
            series: series
        };

        //set the option
        this.setState({
            chartOption: options
        });
    };

    extractFeatures = (feature, ifMaxGVF, measure) => {
        let yAxisList = [measure];
        let GVFScore = (measure==="GVF") ? feature[0].GVF : feature[0].moran;
        let series = [{
            name: measure,
            type: 'bar',
            label: {
                show: true,
                position: (measure==="GVF") ? 'insideRight' : 'right',
                fontSize: 10,
                distance: 2
            },
            data: [{
                value: Math.round(GVFScore * 100) / 100,
                itemStyle: ifMaxGVF ? {color: '#37d67a'} : {color: '#76ccd7'}
            }]
        }];

        return {yAxisList, series};
    };

    componentDidMount() {
        let feature = this.props.feature;
        let ifMaxGVF = this.props.ifMaxGVF;
        let measure = this.props.measure;
        let {yAxisList, series} = this.extractFeatures(feature, ifMaxGVF, measure);
        
        //console.log(this.extractFeatures(features));
        this.setEchartOption(yAxisList, series, measure);
    }

    /** Update the canvas if props change */
    componentWillReceiveProps(nextProps, nextContext){
        let feature = nextProps.feature;
        let ifMaxGVF = nextProps.ifMaxGVF;
        let measure = nextProps.measure;
        let {yAxisList, series} = this.extractFeatures(feature, ifMaxGVF, measure);
        
        //console.log(this.extractFeatures(features));
        this.setEchartOption(yAxisList, series, measure);
    }

    render(){
        if(this.props.feature[0].moran === -1 && this.props.measure !== "GVF"){
            return(
                <span
                    style={{
                        fontSize: 11
                    }}
                >Insignificant Moran's I
                </span> 
            );
        }
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