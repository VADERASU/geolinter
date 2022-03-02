import React, {Component} from "react";
import {Card, Row, Col, Divider, Empty, Statistic } from 'antd';
import SubMapGenerator from "./supportMapGen";
import ScatterGenerator from "./scatterGenerator";
import SubMapHistogram from "./subMapHist";
import SubLineChartGenerator from "./subLineChart";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

class SupportMapView extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
        this.state={
            originalGVF: 0,
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
                        />

                        <Divider
                            style={{marginTop: 5, marginBottom: 5}}
                        />

                        <Empty
                            style={{marginTop: 20}}
                            description={
                                <span>This panel will be updated during the soft rule fixing.</span>
                            }
                        />


                    </Card>
                );
            }else{
                let fitType = softFixSpec.fixType;
                //let newVegaSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
                let newVegaSpec = this.props.vegaLiteSpec;
                let newcolorScheme = softFixSpec.color_scheme;
                let newK = softFixSpec.k;
                let selectClassification = softFixSpec.selectClassification;
                let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
                let classificationIndex = classification_methods_title.indexOf(selectClassification);
                let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
               
                //get the features with the given k
                let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === newK);
                let breaks = subMapFeature[0].breaks;

                if(fitType === "classNum"){
                    newVegaSpec.encoding.color.scale.domain = breaks;
                    newVegaSpec.encoding.color.scale.range = newcolorScheme;
                }
                

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
                                    <Row gutter={5}>
                                        <Col span={12}>
                                        <Statistic
                                            title="GVF Score"
                                            value={11.28}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<ArrowUpOutlined />}
                                            suffix="%"
                                            style={{marginLeft: 10}}
                                        />
                                        </Col>

                                        <Col span={12}>
                                        <Statistic
                                            title="Moran's I"
                                            value={9.3}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                            suffix="%"
                                        />
                                        </Col>
                                    </Row>
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
            
        }

        
    }
}
export default SupportMapView;