import React, {Component} from "react";
import { Typography, Card, Row, Col, Button } from 'antd';
import { csvParse } from "d3";
import RecommendHistogram from "./histoGenerator";
import '../../styles/ClassRecommend.css';
import LineChartGenerator from "./lineGenerator";
import BarChartGenerator from "./barGenerator";

class ListRow extends Component{
    
    render(){
        const { Text } = Typography;
        let features = this.props.dataFeatures;

        let colorRange = features.colorRange;
        let k = colorRange.length;
        let feature = features.featureList.filter(element => element.k === k);
        let maxGVF = this.props.maxGVF;
        let ifMaxGVF = false;
        if(features.methodName === maxGVF){
            ifMaxGVF = true;
        }
        // TODO: if feature.length is 0, make some spatial marks on the corresponding list
        return(
            <Card
                size='small'
                //hoverable={true}
                className='classificationCard'
                style={{
                    height: 50,
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
                            marginTop: 3,
                                
                        }}
                    ><b>{features.methodName}</b>
                    </span>
                    </Col>
                    {/** Histogram */}
                    <Col span={6}>
                        <RecommendHistogram 
                            feature={feature}
                            dataList={features.dataList}
                            colorRange={features.colorRange}
                            maxVal={features.maxVal}
                            minVal={features.minVal}
                        />
                    </Col>
                    <Col span={6}>
                        <LineChartGenerator
                            features={features}
                            colorRange={features.colorRange}
                        />
                    </Col>
                    <Col span={6}>
                        <BarChartGenerator 
                            feature={feature}
                            ifMaxGVF={ifMaxGVF}
                        />
                    </Col>
                    {/** preview BTN */}
                    <Col span={2}>
                        <Button
                            size="small"
                            value={features.methodName}
                            onClick={this.props.onClassificationPreviewClick}
                        >
                            Preview
                        </Button>
                    </Col>
                </Row>
                
            </Card>
        );
    }
}
export default ListRow;