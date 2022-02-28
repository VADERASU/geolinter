import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Row, Col, Select, Slider} from 'antd';

class MapProjection extends Component {
    constructor(props){
        super(props);
        this.state={
            selectProjType: "equalEarth",
            center0: 0,
            center1: 0,
            scale: 150,
        };
    }

    handleProjChange = (value) => {
        this.setState({
            selectProjType: value
        });
        this.props.onMapProjChange(value);
    };

    handleCenter0Change = (val) => {
        this.setState({
            center0: val
        });
        this.props.onMapCenter0Change(val);
    };

    handleCenter1Change = (val) => {
        this.setState({
            center1: val
        });
        this.props.onMapCenter1Change(val);
    };

    handleScaleChange = (val) => {
        this.setState({
            scale: val
        });
        this.props.onMapScaleChange(val);
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
                        <Col span={24}>
                            <Row>
                                <Col span={8}>Projection Type: </Col>
                                <Col span={16}>
                                <Select
                                    size="small"
                                    style={{
                                        float: 'left',
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
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col span={8}>Longitude: </Col>
                                <Col span={16}>
                                    <Slider 
                                        value={this.state.center0} 
                                        step={1}
                                        min={-180}
                                        max={180}
                                        onChange={this.handleCenter0Change}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col span={8}>Latitude: </Col>
                                <Col span={16}>
                                    <Slider 
                                        value={this.state.center1} 
                                        step={1}
                                        min={-180}
                                        max={180}
                                        onChange={this.handleCenter1Change}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col span={8}>Scale: </Col>
                                <Col span={16}>
                                    <Slider 
                                        value={this.state.scale} 
                                        step={1}
                                        min={150}
                                        max={1500}
                                        onChange={this.handleScaleChange}
                                    />
                                </Col>
                            </Row>
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