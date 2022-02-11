import React, {Component} from "react";
import { Typography, Card, Row, Col } from 'antd';
import { csvParse } from "d3";
import RecommendHistogram from "./histoGenerator";

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
                //hoverable={true}
                style={{
                    height: 60,
                    width: 650,
                    background: '#F3F8FB',
                    borderStyle: 'none'

                }}
            >
                <Row>
                    <Col span={6}>
                    <span
                            style={{
                                float:'left',
                                marginTop: 10,
                                
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
                </Row>
                
            </Card>
        );
    }
}
export default ListRow;