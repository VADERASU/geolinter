import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Row, Col, Select, Slider} from 'antd';

class MapProjection extends Component {
    constructor(props){
        super(props);
        this.state={
            selectProjType: "equalEarth",
        };
    }

    handleProjChange = (value) => {
        this.setState({
            selectProjType: value
        });
        this.props.onMapProjChange(value);
    };


    render(){
        let mapFeatureReady = this.props.mapFeatureReady;
        const { Option } = Select;

        if(mapFeatureReady !== null){
            return(
                <Card
                    title="Adjust Map Projection"
                    size='small'
                    className='softRuleCard'
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
                            value={this.state.selectProjType}
                            onChange={this.handleProjChange}
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
export default MapProjection;