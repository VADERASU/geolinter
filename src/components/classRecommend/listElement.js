import React, {Component} from "react";
import { Typography, Card, Row, Col, Button, Space } from 'antd';
import RecommendHistogram from "./histoGenerator";
import '../../styles/ClassRecommend.css';
import LineChartGenerator from "./lineGenerator";
import BarChartGenerator from "./barGenerator";
import preview from "../../resource/preview.png";
import selectIcon from "../../resource/select.png";
import selectLight from "../../resource/selectLight.png";

class ListRow extends Component{

    handldClassificationPreviewClick = () => {
        let selectedClassificationPreview = this.props.dataFeatures.methodName;
        //console.log(selectedClassificationPreview);
        this.props.onClassificationPreviewClick(selectedClassificationPreview);
    };

    handleMethodSelection = () => {      
        let selectedClassificationPreview = this.props.dataFeatures.methodName;
        //console.log(this.props.dataFeatures.methodName);
        this.props.onCurrentClassificationChange(selectedClassificationPreview);
    };

    render(){

        let features = this.props.dataFeatures;

        let colorRange = features.recommend_color;
        let k = features.recommend_k;

        if(features.hasResult){
            let feature = features.featureList.filter(element => element.k === k);
            let maxGVF = this.props.maxGVF;
            let maxMoran = this.props.maxMoran;

            let ifMaxGVF = false;
            let ifMaxMoran = false;
            if(features.methodName === maxGVF){
                ifMaxGVF = true;
            }
            if(features.methodName === maxMoran){
                ifMaxMoran = true;
            }

            let softFixSpec = this.props.softFixSpec;
            let selectClassification = null;
            let ifSelected = "#F3F8FB";
            if(softFixSpec !== null){
                selectClassification = softFixSpec.selectClassification;
            }

            if(selectClassification === features.methodName){
                ifSelected = "#dee2e6";
            }

            return(
                <Card
                    size='small'
                    className='classificationCard'
                    style={{
                        height: 45,
                        width: 650,
                        borderStyle: 'none',
                        backgroundColor: ifSelected,
                    }}
                >
                    <Row>
                        <Col span={4}>
                        {/** Classification name */}
                        <span
                            style={{
                                float:'left',
                                marginTop: (features.methodName === "Mean Standard Deviation") ? 2 : 9,
                                fontSize: 12
                            }}
                        ><b>{features.methodName}</b>
                        </span>
                        </Col>
                        {/** Histogram */}
                        <Col span={5}>
                            <RecommendHistogram 
                                feature={feature}
                                dataList={features.dataList}
                                colorRange={colorRange}
                                maxVal={features.maxVal}
                                minVal={features.minVal}
                                height={44}
                            />
                        </Col>
                        <Col span={5}>
                            <LineChartGenerator
                                features={features}
                                colorRange={colorRange}
                            />
                        </Col>
                        <Col span={5}>
                            <BarChartGenerator 
                                measure={"GVF"}
                                feature={feature}
                                ifMaxGVF={ifMaxGVF}
                            />
                        </Col>
                        <Col span={4}>
                            <BarChartGenerator 
                                measure={"Moran's I"}
                                feature={feature}
                                ifMaxGVF={ifMaxMoran}
                            />
                        </Col>
                        {/** preview BTN */}
                        <Col span={1}>
                            <Space>
                                <Button
                                    size="small"
                                    type="text"
                                    value={features.methodName}
                                    onClick={this.handldClassificationPreviewClick}
                                >
                                    <img src={preview} alt="Preview the map" width="20" height="20" />
                                </Button>

                                <Button
                                size="small"
                                type="text"
                                value={features.methodName}
                                onClick={this.handleMethodSelection}
                                >   
                                    {
                                        selectClassification === features.methodName ?
                                        <img src={selectLight} alt="select this method" width="18" height="18" /> :
                                        <img src={selectIcon} alt="select this method" width="18" height="18" />
                                    }
                                </Button>
                            </Space>
                            
                        </Col>
                    </Row>
                    
                </Card>
            );

        }else{

            let currentFeature = features.featureList;
            let numOfK = currentFeature[0].k;
            return(
                <Card
                    size='small'
                    //hoverable={true}
                    className='classificationCard'
                    style={{
                        height: 45,
                        width: 650,
                        borderStyle: 'none',
                    }}
                >
                    <Row>
                        <Col span={4}>
                        {/** Classification name */}
                        <span
                            style={{
                                float:'left',
                                marginTop: (features.methodName === "Mean Standard Deviation") ? 2 : 9,
                                fontSize: 12
                            }}
                        ><b>{features.methodName}</b>
                        </span>
                        </Col>
                        {/** Annotation */}
                        <Col span={20}>
                        <span
                            style={{
                                float:'left',
                                marginTop: 8,
                                fontSize: 15
                            }}
                        >This classification method generates the results for k = {numOfK}
                        </span> 
                        </Col>
                    </Row>
                    
                </Card>
            );
        }

    }
}
export default ListRow;