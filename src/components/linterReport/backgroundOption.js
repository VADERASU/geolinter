import React, {Component} from "react";
import "../../styles/LinterReport.css"
import arrow from "../../resource/arrow.png";
import {Card, Row, Col, Select, Input, Button, Image, Popover, InputNumber} from 'antd';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

class BgOption extends Component {
    state = {
        color: {
          r: '0',
          g: '0',
          b: '0',
          a: '100',
        },
        bgcolor: {
            r: '243',
            g: '248',
            b: '251',
            a: '100',
        },
        background: '#F3F8FB',
        title: null,
        stroke: null,
        strokeWidth: null,
        className: "softRuleCard",
        ifFixed: "",
      };    
    
      handleChange = (color) => {
        //console.log(color);
        this.setState({ 
            color: color.rgb,
            stroke: color.hex
        });
      };

      handleStrokeWidth = (val) => {
        this.setState({
            strokeWidth: val 
        });
    };

    handleBgChange = (color) => {
        //console.log(color);
        this.setState({
            bgcolor: color.rgb,
            background: color.hex
        });
    };

    handleFix = () => {
        let option = {
            background: this.state.background,
            stroke: this.state.stroke,
            strokeWidth: this.state.strokeWidth,
            title: this.state.title
        };

        this.props.mapOptionSetting(option);
    };

    render(){
        let mapFeatureReady = this.props.mapFeatureReady;
        const { Option } = Select;

        const styles = reactCSS({
            'default': {
              color: {
                width: '50px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });

          const bgStyles = reactCSS({
            'default': {
              color: {
                width: '50px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.bgcolor.r }, ${ this.state.bgcolor.g }, ${ this.state.bgcolor.b }, ${ this.state.bgcolor.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });

          const strokeColorDiv = (
            <div>
                <SketchPicker 
                    color={ this.state.color }
                    disableAlpha={true}
                    presetColors={['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000']}
                    onChange={ this.handleChange } 
                />
            </div>
          );

          const bgColorDiv = (
            <div>
                <SketchPicker 
                    color={ this.state.bgcolor }
                    disableAlpha={true}
                    presetColors={['#F3F8FB','#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000']}
                    onChange={ this.handleBgChange } 
                />
            </div>
          );
      
        if(mapFeatureReady !== null && this.state.classificationList !== null){
            return(
                <Card
                title={"Soft rule violations are detected" + this.state.ifFixed}
                size='small'
                className={this.state.className}
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
                         type="primary"
                         style={{
                            float:'left',
                            width: 80,
                            marginTop: 7,
                            marginRight: 30
                        }}
                        onClick={this.handleFix}
                        >
                            Fix
                        </Button>
                    </div>
                }
                >

                <div style={{padding: 8}}>
                <Row gutter={[5,5]}>
                    <Col span={24}><b style={{color: "red"}}>1. {this.props.backgroundColor}</b></Col>
                    
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
                            <Row>
                                <Col span={10}>
                                    <b>Map background color:</b> 
                                </Col>
                                <Col span={14}>
                                    <Popover content={bgColorDiv}>
                                        <div style={ bgStyles.swatch }>
                                            <div style={ bgStyles.color } />
                                        </div>
                                    </Popover>                               
                                </Col>
                            </Row>
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
export default BgOption;