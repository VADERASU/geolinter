import React, {Component} from "react";
import ReactECharts from 'echarts-for-react';

class LineChartGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartOption: {}
        }
    }

    setEchartOption = (xAxisList, series) => {
        const options = {
            grid: { top: 3, right: 8, bottom: 22, left: 10 },
            xAxis: {
              type: 'category',
              data: xAxisList,
              boundaryGap: false,
              axisLabel: {
                  fontSize: 10
              },
              //axisLine: {show: false}
            },
            yAxis: {
              type: 'value',
              show:false,
              splitLine: {
                show: false
              }
            },
            series: series,
            tooltip: {
              trigger: 'axis',
              formatter: '# of class: {c}'
            },
        };

        //set the option
        this.setState({
            chartOption: options
        });
    };

    extractFeatures = (features, elbowColor) => {
        let featureList = features.featureList;
        let xAxisList = [];

        let GVF_list = [];
        let adcm_list = [];
        let gadf_list = [];
        let elbowPoint = null;
        let GVF_elbow_index = 0;
        featureList.forEach((e,i)=>{
            GVF_list.push(e.GVF);
            adcm_list.push(e.adcm);
            gadf_list.push(e.gadf);
            xAxisList.push(e.k);
            // find the elbow point
            if(i===0){
                elbowPoint = e.adcm - e.GVF;
            }else if(i>0){
                let temp = e.adcm - e.GVF;
                if(temp < elbowPoint && temp >= 0){
                    elbowPoint = temp;
                    GVF_elbow_index = i;
                }
            }
        });
        //console.log(GVF_elbow_index);
        let elbowVal = GVF_list[GVF_elbow_index];
        GVF_list[GVF_elbow_index] = {
            value: elbowVal,
            itemStyle:{
                color: elbowColor,
            },
            symbol: 'circle',
            symbolSize: 10,
        }

        let series = [
            {
                name: 'GVF',
                type: 'line',
                data: GVF_list,
                //symbol: 'circle',
            }
        ];
        
        return {xAxisList, series};
    };

    componentDidMount() {
        let features = this.props.features;
        let colorRange = this.props.colorRange;
        let elbowColor = colorRange[colorRange.length - 1];
        let {xAxisList, series} = this.extractFeatures(features, elbowColor);
        
        //console.log(this.extractFeatures(features));
        this.setEchartOption(xAxisList, series);
    }

    /** Update the canvas if props change */
    componentWillReceiveProps(nextProps, nextContext){

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
export default LineChartGenerator;