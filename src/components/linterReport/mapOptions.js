import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Row, Col, Select, Slider} from 'antd';

class MapOptions extends Component {
    render(){
        //mapOptionSetting
        let mapFeatureReady = this.props.mapFeatureReady;
        const { Option } = Select;

        if(mapFeatureReady !== null){
            return(
                <Card
                    title="Other map options"
                    size='small'
                    className='otherOptCard'
                >
                <div style={{padding: 8}}>
                <Row gutter={[8,8]}>
                    <Col span={24}><b>Select a proper cartographic projection type.</b></Col>
                    <Col span={24}>
                        <Select
                            size="small"
                            style={{
                                width: 225
                            }}
                            
                        >
                            <Option key="equalEarth" value="equalEarth">equalEarth</Option>
                            <Option key="albersUsa" value="albersUsa">albersUsa</Option>
                        </Select>
                    </Col>
                </Row>
                    
                </div>

                </Card>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
}
export default MapOptions;