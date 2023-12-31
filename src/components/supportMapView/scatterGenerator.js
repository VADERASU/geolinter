import React, {Component} from "react";
import ReactECharts from 'echarts-for-react';
import '../../styles/LinterCharts.css';

class ScatterGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartOption: {}
        }
    }

    setEchartOption = (scatterGenerator, currentScatter, originScatter) => {
        const options = {
            grid: { top: 25, right: 20, bottom: 40, left: 30 },
            xAxis: {
                type: 'value',
                name: "Moran's I",
                nameTextStyle: {
                    fontSize: 10
                },
                nameGap: 20,
                nameLocation: 'middle',
                //min: 0,
                //max: 1,
                axisLabel: {
                  fontSize: 10
                },
                scale: true,
                //axisLine: {show: false},
                //axisTick: {show: true},
                //show:false,
            },
            yAxis: {
                type: 'value',
                name: 'GVF',
                nameTextStyle: {
                    fontSize: 10
                },
                nameLocation: 'end',
                nameGap: 5,
                //boundaryGap: false,
                axisLabel: {
                    fontSize: 10
                },
                scale: true
                //axisLine: {show: false},
                //axisTick: {show: false},
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.7)',
                formatter: function (param) {
                  var value = param.value;
                  // prettier-ignore
                  return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 1px;margin-bottom: 1px">'
                            + value[2] + ': <br>'
                            + 'GVF: ' + value[1] + '<br>'
                            + "Moran's I: " + value[0];
                }
            },
            series: [
                {
                    type: 'scatter',
                    symbolSize: 14,
                    data: originScatter,
                    color: '#CF13CC',
                },
                {
                    type: 'effectScatter',
                    symbolSize: 14,
                    data: currentScatter,
                    color: '#37d67a'
                },
                {
                    type: 'scatter',
                    symbolSize: 14,
                    data: scatterGenerator,
                    emphasis: {
                        focus: 'self'
                    },
                    color: '#76ccd7'
                }
            ]
        };

        //set the option
        this.setState({
            chartOption: options
        });
    };

    componentDidMount() {
        //console.log(this.extractFeatures(features));
        this.setEchartOption(this.props.scatterData, this.props.currentScatter, this.props.originScatter);
    }

    /** Update the canvas if props change */
    componentWillReceiveProps(nextProps, nextContext){
        this.setEchartOption(nextProps.scatterData, nextProps.currentScatter, nextProps.originScatter);
    }

    render(){
        return(
           <div
            className="scatterPanel"
           >
                <ReactECharts
                    option={this.state.chartOption} 
                    style={{height: 220, width: '100%'}}
                />               
           </div> 
        );
    }
}
export default ScatterGenerator;