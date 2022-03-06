import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Row, Col, Select, Input, Button} from 'antd';

class MapOptions extends Component {
    constructor(props){
        super(props);
        this.state = {
            size: null,
            background: null,
            stroke: null,
            strokeWidth: null,
            title: null
        };
    }

    handleTitleChange = (val) => {
        this.setState({
            title: val
        });
    };

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
                             style={{
                                float:'left',
                                marginTop: 7,
                                marginRight: 5
                            }}
                            onClick={this.handleFix}
                            >
                                Fix
                            </Button>
                        </div>
                    }
                >
                <div style={{padding: 8}}>
                <Row gutter={[8,8]}>
                    <Col span={24}><b>Calibrate the background color, stroke properties and add a caption.</b></Col>
                    
                    <Col span={24}>
                            <Row>
                                <Col span={24}>
                                    <b>Map caption: </b>You can set a caption that briefly explain the topic.
                                    <Input
                                        style={{marginLeft: 5, marginTop: 5}} 
                                        size="small" 
                                        onChange={this.handleTitleChange} 
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
export default MapOptions;