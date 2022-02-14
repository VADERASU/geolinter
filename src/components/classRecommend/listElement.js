import React, {Component} from "react";
import { Typography, Card, Row, Col, Checkbox, Button } from 'antd';
import { csvParse } from "d3";
import RecommendHistogram from "./histoGenerator";
import '../../styles/ClassRecommend.css';

class ListRow extends Component{
    
    render(){
        const { Text } = Typography;
        let features = this.props.dataFeatures;

        let colorRange = features.colorRange;
        let k = colorRange.length;
        let feature = features.featureList.filter(element => element.k === k);
        // TODO: if feature.length is 0, make some spatial marks on the corresponding list
        return(
            <Card
                size='small'
                hoverable={true}
                className='classificationCard'
                style={{
                    height: 50,
                    width: 650,
                    borderStyle: 'none',
                }}
            >
                <Row>
                    <Col span={6}>
                    <span
                        style={{
                        float:'left',
                            marginTop: 5,
                                
                        }}
                    ><b>{features.methodName}</b>
                    </span>
                    </Col>
                    <Col span={6}>
                        <RecommendHistogram 
                            feature={feature}
                            dataList={features.dataList}
                            colorRange={features.colorRange}
                            maxVal={features.maxVal}
                            minVal={features.minVal}
                        />
                    </Col>
                    <Col span={4}>
                        <Button
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