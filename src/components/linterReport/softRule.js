import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Divider, Row, Col, Image, Select, InputNumber, Radio} from 'antd';
import arrow from "../../resource/arrow.png";

class SoftRulePanel extends Component {

    // # of class -> class breaks & color
    checkSoftViolations = (mapFeatureReady) => {
        let violatedRules = [];
        // check # of class
        if(mapFeatureReady.k < 3 || mapFeatureReady.k > 7){
            // too less or too many classes
            let softMsg = {};
            if(mapFeatureReady.k < 3){
                softMsg.text = "Too less classes, the recommendation of the number of class is 3 to 7.";
            }else{
                softMsg.text = "Too many classes, the recommendation of the number of class is 3 to 7.";
            }
            softMsg.suggestion = "Please select a class number in the recommended range (3 ~ 7).";

            
        }
    };

    render(){
        const { Option } = Select;
        let mapFeatureReady = this.props.mapFeatureReady;
        console.log(mapFeatureReady);
        if(mapFeatureReady !== null){
            return(
                <div>
                <Card
                title='Class Number Warning'
                size='small'
                className='softRuleCard'
                >
                    <div style={{padding: 8}}>
                    <Row gutter={[5,5]}>
                        <Col span={24}><b>Too less classes, the recommendation of the number of class is 3 to 7.</b></Col>
                       
                        <Col span={24}>
                            <Row>
                                <Col span={1}>
                                    <Image
                                        width={15}
                                        src={arrow}
                                        preview={false}
                                        style={{marginLeft: 5}}
                                    />
                                </Col>
                                <Col span={23}>
                                    <b>Fix step 1: </b>select a class number in the recommended range (3 ~ 7):
                                    <InputNumber style={{marginLeft: 5}} size="small" min={3} max={7} defaultValue={3} />
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
                                        style={{marginLeft: 5}}
                                    />
                                </Col>
                                <Col span={23}>
                                    <Row gutter={[5,5]}>
                                        <Col span={3}>
                                        <b>Fix step 2: </b>
                                        </Col>
                                        <Col span={21}>
                                        choose a recommended classification method or make your own class break*:
                                        </Col>
                                        <Col span={16}>
                                        <Radio.Group defaultValue="recommend" size="small">
                                            <Radio.Button value="recommend">recommendation</Radio.Button>
                                            <Radio.Button value="userDefine">User define</Radio.Button>
                                        </Radio.Group>
                                        </Col>
                                        <Col span={8}>
                                        <Select defaultValue="FJ" size="small" style={{ width: 150 }}>
                                            <Option value="EI">Equal Interval</Option>
                                            <Option value="Q">Quantile</Option>
                                            <Option value="MB">Maximum Breaks</Option>
                                            <Option value="FJ">Fisher Jenks</Option>
                                        </Select>
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
                                                style={{marginLeft: 5}}
                                            />
                                        </Col>
                                        <Col span={23}>
                                            <Row gutter={[5,5]}>
                                            <Col span={3}>
                                                <b>Fix step 3: </b>
                                            </Col>
                                            <Col span={21}>
                                                choose a sequantial or diverging color scheme:
                                            </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                
                            </Row>
                        </Col>
                        
                    </Row>  
                    </div>               
                </Card>
                </div>
                
            );
        }else{
            return(
                <div></div>
            );
        }
        
    }
}
export default SoftRulePanel;