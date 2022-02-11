import React, {Component} from "react";
import { Typography, Card, Row, Col } from 'antd';

class ListRow extends Component{
    
    render(){
        const { Text } = Typography;
        let features = this.props.dataFeatures;
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
                    <Col span={4}>
                    <Text strong>{features.methodName}</Text>
                    </Col>
                </Row>
                
            </Card>
        );
    }
}
export default ListRow;