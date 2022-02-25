import React, {Component} from "react";
import {Card, Row, Col, Divider, Empty } from 'antd';
import SubMapGenerator from "./supportMapGen";
import ScatterGenerator from "./scatterGenerator";
import SubMapHistogram from "./subMapHist";
import SubLineChartGenerator from "./subLineChart";

class SupportMapView extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    render(){
        //prepare the submap data
        if(this.props.hasHardRuleViolation){
            // if selected to show the history
            return(
                <Card
                    size='small'
                    className='cardDetail'
                    style={{height: 605,
                        //marginBottom: -200
                    }}
                >
                    <Empty
                        style={{marginTop: 180}}
                        description={
                            <span>Please run the VEGA sript again
                            after fixing the invalid scripts</span>
                        }
                    />
                </Card>
            );
        }else{
            // show soft fixed (updated) map preview
            let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
            //let classificationIndex = classification_methods_title.indexOf(this.props.selectedClassificationFeature);
            //let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
            //let colorRange = this.props.vegaLiteSpec.encoding.color.scale.range;
            //let k = colorRange.length;
                //get the features with the given k
            //let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === k);
            //let breaks = subMapFeature[0].breaks;
            //let subMapSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
                //set new breaks with the selected k and color range
            //subMapSpec.encoding.color.scale.domain = breaks;

                // parpare the scatter plot
                /*
                let scatterData = [];
                let features = this.props.selectedCaseData.features;
                //console.log(features);
                features.classification_methods.forEach((e, i)=>{
                    let scatterPointData = [];
                    let methodFeature = features[e].filter(element => element.k === k);
                    if(methodFeature.length !== 0){
                        //!!!!! NOW IS ADCM!!!! REPLACE THIS WITH MORAN'S I SOON!!
                        scatterPointData.push(Math.round(methodFeature[0].adcm * 100) / 100);
                        // push GVF into the scatter data
                        scatterPointData.push(Math.round(methodFeature[0].GVF * 100) / 100);
                        scatterPointData.push(classification_methods_title[i]);
                        scatterData.push(scatterPointData);
                    }
                });
                */
                // prepare the line chart
                //let featureList = this.props.selectedCaseData.features[keyName];

                return(
                    <Card
                    title='Choropleth Map After Soft Fix'
                    size='small'
                    className='cardDetail'
                    style={{
                        height: 605,
                        //marginBottom: -200
                    }}
                    > 
                        <SubMapGenerator 
                            vegaLiteSpec={this.props.vegaLiteSpec}
                            selectRawCase={this.props.selectRawCase}
                            selectedCaseData={this.props.selectedCaseData}
                        />
                        {/**
                         <Divider
                            style={{marginTop: 5, marginBottom: 5}}
                        />
                        <Row>
                            <Col span={12}>
                                {//scatter plot for the measures - GVF and Moran}
                                <ScatterGenerator 
                                    scatterData={scatterData}
                                />
                            </Col>
                            <Col span={12}>
                                <Row gutter={[8, 8]}>
                                    {// Histogram for the submap }
                                    <Col span={24}>
                                        <SubMapHistogram 
                                            feature={subMapFeature}
                                            dataList={features.data_list}
                                            colorRange={colorRange}
                                            maxVal={features.max}
                                            minVal={features.min}
                                        />
                                    </Col>
                                    {// Line chart for the select classification}
                                    <Col span={24}>
                                        <SubLineChartGenerator 
                                            features={featureList}
                                            colorRange={colorRange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                         */}
                        
                    </Card>
                );
            
        }

        
    }
}
export default SupportMapView;