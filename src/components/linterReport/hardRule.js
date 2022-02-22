import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Divider, Row, Col, Image} from 'antd';
import arrow from "../../resource/arrow.png";

class HardRulePanel extends Component {

    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        let hardRuleMsg = this.props.hardRuleMsg;
        //console.log(hardRuleMsg);
        if(!hasHardRuleViolation){
            return(
                <Alert
                    message="No parsing error"
                    type="success"
                    style={{marginBottom: 5}}
                    showIcon
                    closable
                />
            );
        }else{
            return(
                <Card
                title='Parsing errors'
                size='small'
                className='hardRuleCard'
                style={{marginBottom: 5}}
                extra={
                    <div
                        style={{
                            display: 'inline-block',
                            height: 40,
                            fontSize: 12
                        }}
                    >
                        <Button
                         size="small" 
                         danger
                         style={{
                            float:'left',
                            marginTop: 7,
                            marginRight: 5
                        }}
                        onClick={this.props.onHardRuleFixClick}
                        >
                            Fix
                        </Button>
                    </div>
                }
              >
                  {/** Card Content */}
                  {hardRuleMsg.map((msg,i)=>{
                      return (
                        <Card.Grid hoverable={false} className='cardGrid' key={i}>
                            <Row gutter={[5,5]}>
                                <Col span={24}><b>{msg.title}</b>{msg.text}</Col>
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
                                            <b>Fix suggestion: </b>{msg.fixSuggestion}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider 
                                style={{
                                    marginTop: 8,
                                    marginBottom: 0
                                }}
                            />
                        </Card.Grid>
                      )
                  })}
              </Card>
            );
        }
    }
}
export default HardRulePanel;