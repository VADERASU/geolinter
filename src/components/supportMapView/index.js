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
        this.state={
            originalGVF: 0.32,
            originalMoran: 0.3,
        };
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
            let softFixSpec = this.props.softFixSpec;
            //console.log(softFixSpec);
            if(softFixSpec === null){
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
                            selectProjType={this.props.selectProjType}
                            center0={this.props.center0}
                            center1={this.props.center1}
                            scale={this.props.scale}
                        />
                    </Card>
                );
            }else{
                let fitType = softFixSpec.fixType;
                let newVegaSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
                let newcolorScheme = softFixSpec.color_scheme;
                let newK = softFixSpec.k;
                let selectClassification = softFixSpec.selectClassification;
                let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
                let classificationIndex = classification_methods_title.indexOf(selectClassification);
                let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
               
                //get the features with the given k
                let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === newK);
                let breaks = subMapFeature[0].breaks;

                newVegaSpec.encoding.color.scale.domain = breaks;
                newVegaSpec.encoding.color.scale.range = newcolorScheme;

                let features = this.props.selectedCaseData.features;
                //parpare the scatter plot
                let scatterData = [];
                let currentScatter = [];
                let originScatter = [[this.state.originalMoran, this.state.originalGVF, "Original method"]];
                //console.log(features);
                features.classification_methods.forEach((e, i)=>{
                    let scatterPointData = [];
                    let methodFeature = features[e].filter(element => element.k === newK);
                    if(methodFeature.length !== 0){
                        let moran = Math.round(methodFeature[0].moran * 100) / 100;
                        if(moran >= 0){
                            scatterPointData.push(moran);
                            // push GVF into the scatter data
                            scatterPointData.push(Math.round(methodFeature[0].GVF * 100) / 100);
                            scatterPointData.push(classification_methods_title[i]);
                            if(classification_methods_title[i] === selectClassification){
                                currentScatter.push(scatterPointData);
                            }else{
                                scatterData.push(scatterPointData);
                            }
                        }
                        
                    }
                });

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
                            vegaLiteSpec={newVegaSpec}
                            selectRawCase={this.props.selectRawCase}
                            selectedCaseData={this.props.selectedCaseData}
                            selectProjType={this.props.selectProjType}
                            center0={this.props.center0}
                            center1={this.props.center1}
                            scale={this.props.scale}
                        />

                        <Divider
                            style={{marginTop: 5, marginBottom: 5}}
                        />
                        
                        <Row>
                        <Col span={12}>
                            <Row gutter={[8, 8]}>
                                    
                                <Col span={24}>
                                    <SubMapHistogram 
                                        feature={subMapFeature}
                                        dataList={features.data_list}
                                        colorRange={newcolorScheme}
                                        maxVal={features.max}
                                        minVal={features.min}
                                    />
                                </Col>
                                    
                                <Col span={24}>
                                        {/*}
                                        <SubLineChartGenerator 
                                            features={featureList}
                                            colorRange={colorRange}
                                        />
                                        */}
                                </Col>
                            </Row>
                        </Col>

                        <Col span={12}>
                        <ScatterGenerator 
                            scatterData={scatterData}
                            currentScatter={currentScatter}
                            originScatter={originScatter}
                        />
                        </Col>
                        </Row>
                        
                    </Card>
                );

            }
            // show soft fixed (updated) map preview
            //let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
            
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
               
            
        }

        
    }
}
export default SupportMapView;