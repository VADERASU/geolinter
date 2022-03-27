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

    round = (num) => {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    };

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
                let mapFeatureReady = this.props.mapFeatureReady;
                let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
                //console.log(mapFeatureReady);
                
                let originalGVF = this.props.originalGVF;
                let originalMoran = this.props.originalMoran;
                let features = this.props.selectedCaseData.features;
                //parpare the scatter plot
                let scatterData = [];
                let currentScatter = [];
                let originScatter = [[originalMoran, originalGVF, "Original method"]];
                
                features.classification_methods.forEach((e, i)=>{
                    let scatterPointData = [];
                    let methodFeature = features[e].filter(element => element.k === mapFeatureReady.k);
                    if(methodFeature.length !== 0){
                        let moran = Math.round(methodFeature[0].moran * 100) / 100;
                        if(moran >= 0){
                            scatterPointData.push(moran);
                            // push GVF into the scatter data
                            scatterPointData.push(Math.round(methodFeature[0].GVF * 100) / 100);
                            scatterPointData.push(classification_methods_title[i]);
                            scatterData.push(scatterPointData);
                        }
                    }
                });
                
                return(
                    <Card
                    title={'Choropleth Map After Soft Fix - Original Map'}
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

                        <Row>
                        <Col span={12}>
                            <Row gutter={[8, 8]}>
                                    
                                <Col span={24}>
                                <Empty
                                    style={{marginTop: 5}}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span>Please fix the soft rule violation(s).</span>
                                    }
                                />
                                </Col>
                                    
                                <Col span={24}>
                                    <Row gutter={5}>
                                        <Col span={12}>
                                        <Statistic
                                            title={"Orginal GVF: "}
                                            value={originalGVF}
                                            precision={2}
                                            style={{marginLeft: 40}}
                                        />
                                        </Col>

                                        <Col span={12}>
                                        <Statistic
                                            title={"Original Moran's I: "}
                                            value={originalMoran}
                                            precision={2}
                                        />
                                        </Col>
                                    </Row>
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
            }else{
                let fitType = softFixSpec.fixType;
                //let newVegaSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
                let newVegaSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
                let newcolorScheme = softFixSpec.color_scheme;
                let newK = softFixSpec.k;
                let selectClassification = softFixSpec.selectClassification;
                let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
                let classificationIndex = classification_methods_title.indexOf(selectClassification);
                let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
               
                //get the features with the given k
                let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === newK);
                //let breaks = subMapFeature[0].breaks;
                let breaks = [];
                subMapFeature[0].breaks.forEach(e=>{
                    breaks.push(this.round(e));
                });

                if(fitType === "classNum"){
                    newVegaSpec.encoding.color.scale.domain = breaks;
                    newVegaSpec.encoding.color.scale.range = newcolorScheme;
                }
                

                let features = this.props.selectedCaseData.features;
                //parpare the scatter plot
                let scatterData = [];
                let currentScatter = [];
                let originScatter = [[this.props.originalMoran, this.props.originalGVF, "Original method"]];
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

                // GVF and Moran's I
                let originalGVF = this.props.originalGVF;
                let originalMoran = this.props.originalMoran;
                let newGVF = subMapFeature[0].GVF;
                let newMoran = subMapFeature[0].moran;
                let GVFdiff = newGVF - originalGVF;
                let morandiff = newMoran - originalMoran;

                return(
                    <Card
                    title={'Choropleth Map After Soft Fix - '+selectClassification}
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
                                    <Row gutter={[8, 8]}>
                                        <Col span={12}>
                                        <Statistic
                                            title={"GVF: "+this.round(newGVF)}
                                            value={GVFdiff > 0 ? GVFdiff : 0-GVFdiff}
                                            precision={2}
                                            valueStyle={morandiff > 0 ? { color: '#3f8600' } : { color: '#cf13cc' }}
                                            prefix={GVFdiff>0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            style={{marginLeft: 40}}
                                        />
                                        </Col>

                                        <Col span={12}>
                                        <Statistic
                                            title={"Moran's I: "+this.round(newMoran)}
                                            value={morandiff > 0 ? morandiff : 0-morandiff}
                                            precision={2}
                                            valueStyle={morandiff > 0 ? { color: '#3f8600' } : { color: '#cf13cc' }}
                                            prefix={morandiff>0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            
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