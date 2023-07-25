import React, {Component} from "react";
import "../../styles/LinterReport.css"
import arrow from "../../resource/arrow.png";
import {Card, Row, Col, Select, Input, Button, Image, Popover, InputNumber} from 'antd';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

class GolbalOption extends Component {
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
      };    
    
      handleChange = (color) => {
        //console.log(color);
        this.setState({ color: color.rgb });
        this.props.handleStrokeColor(color.hex);
      };

      handleBgChange = (color) => {
        //console.log(color);
        this.setState({ bgcolor: color.rgb });
        this.props.handleBackground(color.hex);
      };

      handleProjChange = (value) => {
        this.props.onMapProjChange(value);
    };
    

    render(){
        //mapOptionSetting
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
      
        //console.log(this.props.globalProjHighlight);
        return(
            <div style={{padding: 8}}>
            <Row gutter={[5,5]}>
                <Col span={24}><b>Calibrate the projection, background, stroke properties and add a caption.</b></Col>
                
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
                                <div 
                                    className={this.props.globalProjHighlight}
                                >
                                    <Row gutter={[5,5]}>
                                            <Col span={24}>
                                                <b>Map projection: </b> Recommend <b>[albersUsa]</b> based on your coordinates.
                                            </Col>
                                            <Col span={24}>
                                            <Select
                                                size="small"
                                                style={{
                                                    width: 225
                                                }}
                                                value={this.props.selectProjType}
                                                onChange={this.handleProjChange}
                                            >
                                                <Option key="equalEarth" value="equalEarth">equalEarth</Option>
                                                <Option key="azimuthalEqualArea" value="azimuthalEqualArea">azimuthalEqualArea</Option>
                                                <Option key="albersUsa" value="albersUsa">albersUsa</Option>
                                                <Option key="albers" value="albers">albers</Option>
                                                <Option key="azimuthalEquidistant" value="azimuthalEquidistant">naturalEarth1</Option>
                                            </Select>
                                            </Col>
                                    </Row>      
                                </div>                           
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
                                            <b>Map title: </b>Enter the theme, place, and time to describe your map.
                                        </Col>
                                        <Col span={24}>
                                        <Input
                                            size="small" 
                                            placeholder="e.g. 2022 U.S. Income Per Capita"
                                            onChange={this.props.onTitleChange} 
                                        />
                                        </Col>
                                </Row>                                 
                            </Col>
                        </Row>
                </Col>

                <div 
                    className={this.props.globalColorHighlight}
                >
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

                                <Col span={24}>
                                    <Row>
                                        <Col span={6}>
                                            Stroke color: 
                                        </Col>
                                        <Col span={6}>
                                            <Popover content={strokeColorDiv}>
                                            <div style={ styles.swatch } onClick={ this.handleClick }>
                                                <div style={ styles.color } />
                                            </div>
                                            </Popover>
                                        </Col>
                                        <Col span={6}>
                                            Stroke width: 
                                        </Col>
                                        <Col span={6}>
                                        <InputNumber
                                            style={{marginLeft: 5}} 
                                            size="small" 
                                            min={0} 
                                            max={1}
                                            step={0.1} 
                                            defaultValue={1}
                                            onChange={this.props.handleStrokeWidth} 
                                        />
                                        </Col>
                                    </Row>
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
                </div>
            </Row>
            </div>
            
        );
    }
}
export default GolbalOption;