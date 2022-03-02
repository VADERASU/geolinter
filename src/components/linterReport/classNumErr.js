import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Divider, Row, Col, Image, Select, InputNumber, Radio} from 'antd';
import arrow from "../../resource/arrow.png";
import { UpCircleTwoTone, DownCircleTwoTone } from '@ant-design/icons';

class ClassNumErr extends Component {
    constructor(props){
        super(props);
        this.state = {
            k: 3,
            color_scheme: ['#5dc963', '#21918d', '#3b528b'],
            color_scheme_name: "Sequential: viridis",
            sortMeasure: "GVF",
            selectClassification: null,
            classificationList: null,
            selectedCaseData: null,
            originalGVF: 0,
            originalMoran: 0,
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

    round = (num) => {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    };

    makeClassAccCompare = (classification) => {
        let newGVF = this.round(classification.GVF);
        let oriGVF = this.round(this.state.originalGVF);
        let newMoran = this.round(classification.moran);
        let oriMoran = this.round(this.state.originalMoran);
        let GVFdiv = null;
        let Morandiv = null;
        if(newGVF > oriGVF){
            GVFdiv = <div key={classification.methodName+"GVF"} >GVF: {newGVF} <UpCircleTwoTone twoToneColor="#52c41a" /></div>    
        }else if(newGVF < oriGVF){
            GVFdiv = <div key={classification.methodName+"GVF"} >GVF: {newGVF} <DownCircleTwoTone twoToneColor="#de2d26" /></div>    
        }
        if(newMoran === -1){
            Morandiv = <div key={classification.methodName+"MORAN"} style={{marginLeft:5, fontSize:10}}>Moran's I insignificant</div>
        }else if(newMoran > oriMoran){
            Morandiv = <div key={classification.methodName+"MORAN"} style={{marginLeft:5}}>Moran's I: {newMoran} <UpCircleTwoTone twoToneColor="#52c41a" /></div>
        }else if(newMoran < oriMoran){
            Morandiv = <div key={classification.methodName+"MORAN"} style={{marginLeft:5}}>Moran's I: {newMoran} <DownCircleTwoTone twoToneColor="#de2d26" /></div>
        }
        
        let MeasureDIV = <div className="colorDIV-container" style={{fontSize: 12}}>{GVFdiv}, {Morandiv}</div>;

        return MeasureDIV
    };

    handleNumOfClassChange = (value) => {
        let colorList = this.props.colorList;
        let k = value;
        let recommend_color_name = this.state.color_scheme_name;
        let index = colorList.name.indexOf(recommend_color_name);
        let color = colorList[k][index];
        this.setState({
            k: value,
            color_scheme: color
        });
        this.generateClassificationList(this.state.selectedCaseData, k, this.state.sortMeasure);
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

    handleClassificationChange = (value) => {
        let measure = value.target.value;
        if(measure === "maxGVF"){
            this.generateClassificationList(this.state.selectedCaseData, this.state.k, "GVF");
            this.setState({
                sortMeasure: "GVF"
            });
        }else{
            this.generateClassificationList(this.state.selectedCaseData, this.state.k, "moran");
            this.setState({
                sortMeasure: "moran"
            });
        }
    };

    generateClassificationList = (selectedCaseData, numClass, sortMeasure) => {
        const data = [];
        let classification_methods_title = selectedCaseData.features.classification_methods_title;
        classification_methods_title.forEach((element, i)=>{
            let keyName = selectedCaseData.features.classification_methods[i];
            let currentFeature = selectedCaseData.features[keyName];
            let k = numClass;
            let feature = {
                methodName: element,
                featureList: currentFeature,
                maxVal: selectedCaseData.features.max,
                minVal: selectedCaseData.features.min,
            };
            let featureWithCurrentK = currentFeature.filter(element => element.k === k);
            if(featureWithCurrentK.length === 0){
                // dont have results in the current number of class
                feature.hasResult = false;
                feature.GVF = -1;
                feature.moran = -1;
            }else{
                //sort the methods based on GVF
                feature.hasResult = true;
                feature.GVF = featureWithCurrentK[0].GVF;
                feature.moran = featureWithCurrentK[0].moran;
            }

            if(sortMeasure === "GVF"){
                if(data.length === 0){
                    data.push(feature);    
                }else{
                    let max_i = -1;
                    let flag = true;
                    data.forEach((e,i)=>{
                        if(feature.GVF > e.GVF && flag === true){
                            max_i = i;
                            flag = false;
                        }
                    });

                    if(max_i !== -1){
                        data.splice(max_i, 0, feature);
                    }else{
                        data.push(feature);
                    } 
                }
            }else{
                if(data.length === 0){
                    data.push(feature);    
                }else{
                    let max_i = -1;
                    let flag = true;
                    data.forEach((e,i)=>{
                        if(feature.moran > e.moran && flag === true){
                            max_i = i;
                            flag = false;
                        }
                    });

                    if(max_i !== -1){
                        data.splice(max_i, 0, feature);
                    }else{
                        data.push(feature);
                    } 
                }
            }
        });
        this.setState({
            classificationList: data,
            selectClassification: data[0].methodName
        });
    };

    handleClassificationSelect = (value) => {
        this.setState({
            selectClassification: value
        });
    };

    handleFix = () => {
        let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
        let classificationIndex = classification_methods_title.indexOf(this.state.selectClassification);
        let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
        let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === this.state.k);
        let breaks = subMapFeature[0].breaks;

        let fixObj = {
            k: this.state.k,
            color_scheme: this.state.color_scheme,
            color_scheme_name: this.state.color_scheme_name,
            selectClassification: this.state.selectClassification,
            breaks: breaks,
            fixType: "classNum"
        };
        this.props.onSoftFix(fixObj);
    };

    componentDidMount() {
        //let currentMapFeature = this.props.currentMapFeature;
        
        let selectedCaseData = this.props.selectedCaseData;
        this.generateClassificationList(selectedCaseData, this.state.k, "GVF");
        this.setState({
            selectedCaseData: selectedCaseData,
            originalGVF: this.props.originalGVF,
            originalMoran: this.props.originalMoran
        });
    }

    componentWillReceiveProps(nextProps, nextContext){
        //let currentMapFeature = nextProps.currentMapFeature;
        let selectedCaseData = nextProps.selectedCaseData;
        this.generateClassificationList(selectedCaseData, this.state.k, "GVF");
        this.setState({
            selectedCaseData: selectedCaseData,
            originalGVF: this.props.originalGVF,
            originalMoran: this.props.originalMoran
        });
    }

    render(){
        const { Option } = Select;
        let mapFeatureReady = this.props.mapFeatureReady;
        let currentMapFeature = this.props.currentMapFeature;

        const colorOption = [];
        this.props.colorList.name.forEach((e, i)=>{
            let option = <Option key={e} value={e} ><div style={{display: "flex"}}>{e}{this.makeColor(e)}</div></Option>;
            colorOption.push(option);
        });

        

        // make dropdown list for classification recommendation
        const dataOption = [];
        if(this.state.classificationList !== null){
            this.state.classificationList.forEach(e=>{
                let option = <Option key={e.methodName} value={e.methodName} ><div style={{display: "flex"}}>{e.methodName}{this.makeClassAccCompare(e)}</div></Option>;
                if(e.hasResult)
                    dataOption.push(option);
            });
        }

        let ErrMsg = this.props.errProp;
        if(this.props.errColor !== null){
            ErrMsg = ErrMsg + ", " + this.props.errColor;
        }
        if(this.props.errAccu !== null){
            ErrMsg = ErrMsg + ", " + this.props.errAccu;
        }

        //console.log(this.state);
        if(mapFeatureReady !== null){
            return(
                <div>
                <Card
                title={ErrMsg}
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
                        <Col span={24}><b>The recommendation of the number of class is 3 to 7.</b></Col>

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
                                    <b>Fix step 1: </b>Select a class number in the recommended range (3 ~ 7):
                                    <InputNumber
                                        style={{marginLeft: 5}} 
                                        size="small" 
                                        min={3} 
                                        max={7} 
                                        value={this.state.k} 
                                        onChange={this.handleNumOfClassChange} 
                                    />
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
                                        <Col span={24}>
                                            <span
                                            style={{
                                                float:'left',
                                                marginRight: 5
                                            }}
                                            ><b>Fix step 2: </b>Choose a color scheme: </span>
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
                                            <b>Fix step 3: </b> Choose a recommended classification method: 
                                        </Col>
                                        <Col span={10}>
                                            <Radio.Group defaultValue="maxGVF" size="small" onChange={this.handleClassificationChange}>
                                                <Radio.Button value="maxGVF">Highest GVF</Radio.Button>
                                                <Radio.Button value="maxMoran">Highest Moran's I</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        <Col span={14}>
                                            <Select value={this.state.selectClassification} size="small" style={{ width: 330 }} onChange={this.handleClassificationSelect}>
                                                {dataOption}
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
        
    }
}
export default ClassNumErr;