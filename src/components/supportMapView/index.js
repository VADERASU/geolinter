import React, {Component} from "react";
import {Card, Row, Col, Divider, Empty } from 'antd';
import embed from 'vega-embed';
import SubMapGenerator from "./supportMapGen";
import ScatterGenerator from "./scatterGenerator";
import SubMapHistogram from "./subMapHist";

class SupportMapView extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMapHistory = (selectedCaseData, spec, selectRawCase) => {
        if(selectRawCase === 'county_unemployment'){

            spec.data.values = selectedCaseData.geo;
            spec.transform[0].from.data.values = selectedCaseData.data.data;
            //console.log(spec);
            spec.height = 200;
            spec.width = 400;
            spec.encoding.color.legend = null;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        }else{
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData;
            spec.height = 200;
            spec.width = 400;
            if(spec.encoding.hasOwnProperty('color')) spec.encoding.color.legend = null;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        }  
    };

    /** class function section */
    componentDidMount(){
        if(this.props.oldSelectRawCase !== null){
            //this.drawVegaMapHistory(this.props.oldSelectedCaseData, this.props.specHistory, this.props.oldSelectRawCase);
        }
        
        //console.log(this.props);
    }

    componentDidUpdate(){
        if(this.props.oldSelectRawCase !== null){
            //this.drawVegaMapHistory(this.props.oldSelectedCaseData, this.props.specHistory, this.props.oldSelectRawCase);
        }
    }

    render(){
        //prepare the submap data
        if(this.props.showHistory){
            // if selected to show the history
            return(
                <Card
                size='small'
                className='cardDetail'
                style={{
                    height: 605,
                    marginBottom: -200
                }}
                > 
                    <SubMapGenerator 
                        
                    />
        
                    <Divider
                        style={{marginTop: 5, marginBottom: 5}}
                    />
                    <Row>
                        <Col span={24}>
                            
                        </Col>
                    </Row>
                </Card>
            );
        }else{
            // show selected map preview
            if(this.props.selectedClassificationFeature !== null){
                let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
                //let classification_methods = this.props.selectedCaseData.features.classification_methods;
                let classificationIndex = classification_methods_title.indexOf(this.props.selectedClassificationFeature);
                let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
                let colorRange = this.props.vegaLiteSpec.encoding.color.scale.range;
                let k = colorRange.length;
                //get the features with the given k
                let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === k);
                let breaks = subMapFeature[0].breaks;
                let subMapSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
                //set new breaks with the selected k and color range
                subMapSpec.encoding.color.scale.domain = breaks;

                // parpare the scatter plot
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

                return(
                    <Card
                    size='small'
                    className='cardDetail'
                    style={{
                        height: 605,
                        marginBottom: -200
                    }}
                    > 
                        <SubMapGenerator 
                            subMapSpec={subMapSpec}
                            selectRawCase={this.props.selectRawCase}
                            selectedCaseData={this.props.selectedCaseData}
                        />
            
                        <Divider
                            style={{marginTop: 5, marginBottom: 5}}
                        />
                        <Row>
                            <Col span={12}>
                                {/** scatter plot for the measures - GVF and Moran */}
                                <ScatterGenerator 
                                    scatterData={scatterData}
                                />
                            </Col>
                            <Col span={12}>
                                <Row>
                                    {/** Histogram for the submap */}
                                    <Col span={24}>
                                        <SubMapHistogram 
                                            feature={subMapFeature}
                                            dataList={features.data_list}
                                            colorRange={colorRange}
                                            maxVal={features.max}
                                            minVal={features.min}
                                        />
                                    </Col>
                                    {/** Line chart for the select classification */}
                                    <Col span={24}></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                );
            }else{
                // not selected preview yet
                return(
                    <Card
                    size='small'
                    className='cardDetail'
                    style={{
                        height: 605,
                        marginBottom: -200
                    }}
                    > <Empty /> </Card>
                    
                );
            }
            
        }

        
    }
}
export default SupportMapView;