import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Divider, Row, Col, Image, Select, InputNumber, Radio} from 'antd';
import arrow from "../../resource/arrow.png";

class FillColorErr extends Component {
    constructor(props){
        super(props);
        this.state = {
            k: 3,
            color_scheme: ['#5dc963', '#21918d', '#3b528b'],
            color_scheme_name: "Sequential: viridis",
        };
    }

    makeColor = (recommend_color_name) => {
        let colorList = this.props.colorList;
        let k = this.state.k;
        let index = colorList.name.indexOf(recommend_color_name);
        let color = colorList[k][index];
        let colorCube = [];
        color.forEach(e=>{
            let style = {backgroundColor: e};
            colorCube.push(<div key={e} className="colorCube" style={style}></div>);
        });
        let colorDIV = <div className="colorDIV-container">{colorCube}</div>;

        return colorDIV
    };

    handleColorChange = (value) => {
        let colorList = this.props.colorList;
        let k = this.state.k;
        let recommend_color_name = value;
        let index = colorList.name.indexOf(recommend_color_name);
        let color = colorList[k][index];
        this.setState({
            color_scheme: color,
            color_scheme_name: recommend_color_name
        });
    };

    handleFix = () => {
        let fixObj = {
            k: this.state.k,
            color_scheme: this.state.color_scheme,
            color_scheme_name: this.state.color_scheme_name,
            fixType: "fillColorScheme"
        };
        this.props.onSoftFix(fixObj);
    };

    componentDidMount() {
        //let currentMapFeature = this.props.currentMapFeature;
        let mapFeatureReady = this.props.mapFeatureReady;
        this.setState({
            k: mapFeatureReady.k,
        });
    }

    componentWillReceiveProps(nextProps, nextContext){
        //let currentMapFeature = nextProps.currentMapFeature;
        let mapFeatureReady = nextProps.mapFeatureReady;
        this.setState({
            k: mapFeatureReady.k,
        });
    }

    render(){
        if(this.props.hasErr !== "none"){
            const { Option } = Select;

            let mapFeatureReady = this.props.mapFeatureReady;

            const colorOption = [];
            this.props.colorList.name.forEach((e, i)=>{
                let option = <Option key={e} value={e} ><div style={{display: "flex"}}>{e}{this.makeColor(e)}</div></Option>;
                colorOption.push(option);
            });

            if(mapFeatureReady !== null){
                return(
                    <div>
                        <Card
                        title={this.props.errProp}
                        size='small'
                        className='softRuleCard'
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
                                <Col span={24}><b>Colors are not noticeably different.</b></Col>

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
                                            <Col span={24}>
                                                <span
                                                style={{
                                                    float:'left',
                                                    marginRight: 5
                                                }}
                                                ><b>Fix: </b>Choose a color scheme: </span>
                                                <Select
                                                    size="small"
                                                    style={{
                                                        float: 'left',
                                                        width: 225
                                                    }}
                                                    value={this.state.color_scheme_name}
                                                    onChange={this.handleColorChange}
                                                >
                                                    {colorOption}
                                                </Select>
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
        }else{
            return(
                <div></div>
            );
        }
    }
}
export default FillColorErr;