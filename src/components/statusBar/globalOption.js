import React, {Component} from "react";
import "../../styles/LinterReport.css"
import arrow from "../../resource/arrow.png";
import {Card, Row, Col, Select, Input, Button, Image} from 'antd';

class GolbalOption extends Component {
    

    render(){
        //mapOptionSetting
        const { Option } = Select;

        return(
            <div style={{padding: 8, overflow: "scroll"}}>
            <Row gutter={[5,5]}>
                <Col span={24}><b>Calibrate the background color, stroke properties and add a caption.</b></Col>
                
                <Col span={24}>
                        <Row>
                            <Col span={1}>
                                <Image
                                    width={15}
                                    src={arrow}
                                    preview={false}
                                    
                                />
                            </Col>
                            <Col span={23}>
                                <Row gutter={[5,5]}>
                                        <Col span={24}>
                                            <b>Map caption: </b>You can set a caption that briefly explain the topic.
                                        </Col>
                                        <Col span={24}>
                                        <Input
                                            size="small" 
                                            placeholder="Map caption"
                                            onChange={this.props.onTitleChange} 
                                        />
                                        </Col>
                                </Row>                                 
                            </Col>
                        </Row>
                </Col>

                <Col span={24}>
                    <Row>
                        <Col span={1}>
                            <Image
                                width={15}
                                src={arrow}
                                preview={false}    
                            />
                        </Col>
                        <Col span={23}>
                            <Row gutter={[5,5]}>
                                <Col span={24}>
                                    <b>Stroke properties: </b>Carefully choose a stroke color and set the width of it.
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

            </Row>
            </div>
            
        );
    }
}
export default GolbalOption;