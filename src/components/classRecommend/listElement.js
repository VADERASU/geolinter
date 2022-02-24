import React, {Component} from "react";
import { Typography, Card, Row, Col, Button, Image } from 'antd';
import RecommendHistogram from "./histoGenerator";
import '../../styles/ClassRecommend.css';
import LineChartGenerator from "./lineGenerator";
import BarChartGenerator from "./barGenerator";
import preview from "../../resource/preview.png";

class ListRow extends Component{
    
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

            return(
                <Card
                    size='small'
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
                        {/** Histogram */}
                        <Col span={5}>
                            <RecommendHistogram 
                                feature={feature}
                                dataList={features.dataList}
                                colorRange={colorRange}
                                maxVal={features.maxVal}
                                minVal={features.minVal}
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
                                ifMaxGVF={ifMaxGVF}
                            />
                        </Col>
                        {/** preview BTN */}
                        <Col span={1}>
                            <Button
                                size="small"
                                type="text"
                                value={features.methodName}
                                onClick={this.props.onClassificationPreviewClick}
                            >
                                <img src={preview} width="20" height="20" />
                            </Button>
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
                        >This classification method generates the rusults for k = {numOfK}
                        </span> 
                        </Col>
                    </Row>
                    
                </Card>
            );
        }

    }
}
export default ListRow;