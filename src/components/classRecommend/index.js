import React, {Component} from "react";
import {Card, List, Select, Empty, InputNumber, Row, Col, Drawer, Divider, Slider} from 'antd';
import ListRow from "./listElement";
import '../../styles/ClassRecommend.css';
import RecommendationPreviewMap from "./mapGenerator";
import HistPreview from "./histPreview";

class ClassRecommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortMeasure: "GVF",
            recommend_k: 3,
            recommend_color: ['#5dc963', '#21918d', '#3b528b'],
            recommend_color_name: "Sequential: viridis",
            selectedClassificationFeature: null,
            previewMapSpec: null,
            histProp: {
                subMapFeature: null,
                dataList: null,
                minVal: null,
                maxVal: null
            },
            drawerVisible: false,
            drawerHide: "none",
            binSize: 'thresholdFreedmanDiaconis'
        };
    }

    handleSortMeasure = (value) => {
        //console.log(value);
        this.setState({
            sortMeasure: value
        });
    };

    handleNumOfClassChange = (value) => {
        let colorList = this.props.colorList;
        let k = value;
        let recommend_color_name = this.state.recommend_color_name;
        let index = colorList.name.indexOf(recommend_color_name);
        let color = colorList[k][index];
        this.setState({
            recommend_k: value,
            recommend_color: color
        });
        
        this.props.onCurrentKChange(k);
        this.props.onCurrentColorChange(color, recommend_color_name);
    };

    handleColorChange = (value) => {
        let colorList = this.props.colorList;
        let k = this.state.recommend_k;
        let recommend_color_name = value;
        let index = colorList.name.indexOf(recommend_color_name);
        let color = colorList[k][index];
        this.setState({
            recommend_color: color,
            recommend_color_name: recommend_color_name
        });
        // synchornize the color state in APP.js
        this.props.onCurrentColorChange(color, recommend_color_name);
    };

    makeColor = (recommend_color_name) => {
        let colorList = this.props.colorList;
        let k = this.state.recommend_k;
        //console.log(k);
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

    // handle the classifiation recommendation preview click
    handldClassificationPreviewClick = (val) => {
        let selectedClassificationPreview = val;
        //console.log(selectedClassificationPreview);
        let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
        let classificationIndex = classification_methods_title.indexOf(selectedClassificationPreview);
        let keyName = this.props.selectedCaseData.features.classification_methods[classificationIndex];
        let k = this.state.recommend_k;
        let subMapFeature = this.props.selectedCaseData.features[keyName].filter(element => element.k === k);
        let breaks = [];
        subMapFeature[0].breaks.forEach(e=>{
            breaks.push(this.round(e));
        });
        let subMapSpec = JSON.parse(JSON.stringify(this.props.vegaLiteSpec));
        subMapSpec.encoding.color.scale.domain = breaks;
        subMapSpec.encoding.color.scale.range = this.state.recommend_color;
        if(this.props.selectRawCase === "state_education"){
            subMapSpec.projection = {
                "type": "albersUsa"
            };
        }
        
        subMapSpec.height = 230
        subMapSpec.width = 400
        //console.log(selectedClassificationPreview);
        // generate histogram data
        let data_list = this.props.selectedCaseData.features.data_list;
        let maxVal = this.props.selectedCaseData.features.max;
        let minVal = this.props.selectedCaseData.features.min;

        this.setState({
            selectedClassificationFeature: selectedClassificationPreview,
            drawerVisible: true,
            drawerHide: "block",
            previewMapSpec: subMapSpec,
            histProp: {
                subMapFeature: subMapFeature,
                dataList: data_list,
                minVal: minVal,
                maxVal: maxVal
            }
        });
    };

    handleMethodSelection = (val) => {
        //console.log(val);
        let currentK = this.state.recommend_k;
        let currentColor = this.state.recommend_color;
        let currentColorName = this.state.recommend_color_name;
        let selectClassification = val;
        let currentSelectRecomm = {
            k: currentK,
            color_scheme: currentColor,
            color_scheme_name: currentColorName,
            selectClassification: selectClassification
        };
        this.props.onRecommendMethodSelection(currentSelectRecomm);
    };

    onDrawerClose = () => {
        this.setState({
            drawerVisible: false,
            drawerHide: "none",
        });
    };

    componentDidMount() {
        let color_scheme = this.props.color_scheme_name;
        this.setState({
            recommend_k: this.props.recommend_k,
            recommend_color: this.props.recommend_color,
            recommend_color_name: (color_scheme !== null) ? color_scheme : "Sequential: viridis"
        });
        //this.props.onCurrentKChange(this.state.recommend_k);
        //this.props.onCurrentColorChange(this.state.recommend_color, this.state.recommend_color_name);
    }

    componentWillReceiveProps(nextProps, nextContext){
        let color_scheme = nextProps.color_scheme_name;
        this.setState({
            recommend_k: nextProps.recommend_k,
            recommend_color: nextProps.recommend_color,
            recommend_color_name: (color_scheme !== null) ? color_scheme : "Sequential: viridis"
        });
        //this.props.onCurrentKChange(nextProps.recommend_k);
        //this.props.onCurrentColorChange(nextProps.recommend_color, nextProps.recommend_color_name);
    }

    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        //console.log(this.state);
        if(hasHardRuleViolation){
            return(
                <Card
                size='small'
                className='cardDetail'
                style={{height: 500}}
                >
                    <Empty
                        style={{marginTop: 120}}
                        description={
                            <span>Please run the VEGA sript again
                            after fixing the invalid scripts</span>
                        }
                    />
                </Card>
            );
        }else{
            const data = [];

            let maxGVF = '';
            let maxGVFindex = 0;
            let maxMoran = '';
            let maxMoranIndex = 0;

            let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
            let classification_methods = this.props.selectedCaseData.features.classification_methods;
            
            classification_methods.forEach((element, i) => {
                let currentFeature = this.props.selectedCaseData.features[element];
                let k = this.state.recommend_k;

                let feature = {
                    methodName: classification_methods_title[i],
                    featureList: currentFeature,
                    dataList: this.props.selectedCaseData.features.data_list,
                    //colorRange: this.props.vegaLiteSpec.encoding.color.scale.range,
                    maxVal: this.props.selectedCaseData.features.max,
                    minVal: this.props.selectedCaseData.features.min,
                    recommend_k: this.state.recommend_k,
                    recommend_color: this.state.recommend_color
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

                //get max GVF score and max Moran's I
                currentFeature.forEach(j=>{
                    let name = classification_methods_title[i];
                    if(j.k === k){
                        if(j.GVF > maxGVFindex){
                            maxGVFindex = j.GVF;
                            maxGVF = name;
                        }

                        if(j.moran > maxMoranIndex){
                            maxMoranIndex = j.moran;
                            maxMoran = name;
                        }
                    }
                });

                if(this.state.sortMeasure === "GVF"){
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
            //console.log(data);
            //this.props.onCurrentKChange(this.state.recommend_k);
            //this.props.onCurrentColorChange(this.state.recommend_color, this.state.recommend_color_name);
            //this.props.onCurrentMeasuresChange(maxGVF, maxMoran);
    
            const { Option } = Select;
            const measureOption = [];
            this.props.classificationMeasureList.forEach(e=>{
                measureOption.push(<Option key={e} value={e}>{(e==='Moran')? "Moran's I" : e}</Option>);
            });

            const colorOption = [];
            const k = this.state.recommend_k;
            //let index = this.props.colorList.name.indexOf(this.state.recommend_color_name);
            this.props.colorList.name.forEach((e, i)=>{
                let option = <Option key={e} value={e} ><div style={{display: "flex"}}>{e}{this.makeColor(e)}</div></Option>;
                colorOption.push(option);
            });

    
            return(
                <Card
                //title='Classification Recommendation'
                size='small'
                className='cardDetail'
                style={{height: 450}}
                extra={
                    <div
                        style={{
                            display: 'inline-block',
                            height: 70,
                            fontSize: 12
                        }}
                    >
                        <Row
                            style={{marginLeft: 20}}
                        >
                            <Col span={24}>
                                <span
                                    style={{
                                        float:'left',
                                        marginTop: 10,
                                        marginLeft: -20,
                                        fontSize: 14
                                    }}
                                >Classification Recommendation</span>  
                            </Col>
                            <Col span={24}>
                                <span
                                    style={{
                                        float:'left',
                                        marginTop: 10,
                                        marginRight: 5
                                    }}
                                ># of class: </span>
                                <InputNumber 
                                    style={{
                                        float:'left',
                                        marginTop: 7,
                                        marginRight: 20,
                                        width: 50
                                    }} 
                                    size="small" 
                                    min={3} 
                                    max={7} 
                                    value={this.state.recommend_k}
                                    onChange={this.handleNumOfClassChange}
                                />
                                <span
                                style={{
                                    float:'left',
                                    marginTop: 10,
                                    marginRight: 5
                                }}
                                >Color scheme: </span>
                                <Select
                                    size="small"
                                    style={{
                                        float: 'left',
                                        marginTop: '7px',
                                        marginRight: '15px',
                                        width: 225
                                    }}
                                    value={this.state.recommend_color_name}
                                    onChange={this.handleColorChange}
                                >
                                    {colorOption}
                                </Select>
                                <span
                                    style={{
                                        float:'left',
                                        marginTop: 10,
                                        marginRight: 5
                                    }}
                                >Sort by: </span>
                                <Select
                                    size="small"
                                    style={{
                                        float: 'left',
                                        marginTop: '7px',
                                        marginRight: '2px',
                                        width: 100
                                    }}
                                    defaultValue="GVF"
                                    onChange={this.handleSortMeasure}
                                >
                                    {measureOption}
                                </Select>
                            </Col>
                        </Row>
                        
                    </div>
                }
              >
                <List
                    dataSource={data}
                    renderItem={item =>(
                        <List.Item>
                            <ListRow
                                softFixSpec={this.props.softFixSpec}
                                maxGVF={maxGVF}
                                maxMoran={maxMoran}
                                dataFeatures={item}
                                onClassificationPreviewClick={this.handldClassificationPreviewClick}
                                onCurrentClassificationChange={this.handleMethodSelection}
                            />
                        </List.Item>
                    )}
                />

                <Drawer
                    title="Choropleth Map Preview"
                    placement="right"
                    onClose={this.onDrawerClose}
                    visible={this.state.drawerVisible}
                    getContainer={false}
                    width={500}
                    style={{ position: 'absolute', display: this.state.drawerHide}}
                    headerStyle={{height: 20, backgroundColor: "#F3F8FB"}}
                    bodyStyle={{padding: 5, backgroundColor: "#F3F8FB"}}
                    >
                    <RecommendationPreviewMap 
                        subMapSpec={this.state.previewMapSpec}
                        selectRawCase={this.props.selectRawCase}
                        selectedCaseData={this.props.selectedCaseData}
                    />
                    <Divider
                        style={{marginTop: 5, marginBottom: 5}}
                    />
                    <HistPreview 
                        feature={this.state.histProp.subMapFeature}
                        dataList={this.state.histProp.dataList}
                        colorRange={this.state.recommend_color}
                        maxVal={this.state.histProp.maxVal}
                        minVal={this.state.histProp.minVal}
                        height={120}
                    />
                </Drawer>
    
              </Card>
            );
        }

    }
}
export default ClassRecommend;