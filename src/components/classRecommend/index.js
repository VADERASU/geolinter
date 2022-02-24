import React, {Component} from "react";
import {Card, List, Select, Empty, InputNumber, Row, Col, Drawer} from 'antd';
import ListRow from "./listElement";
import '../../styles/ClassRecommend.css';

class ClassRecommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortMeasure: "GVF",
            recommend_k: 3,
            recommend_color: ['#5dc963', '#21918d', '#3b528b'],
            recommend_color_name: "Sequential: viridis",
            selectedClassificationFeature: null,
            drawerVisible: false,
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
    };

    makeColor = (recommend_color_name) => {
        let colorList = this.props.colorList;
        let k = this.state.recommend_k;
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

    // handle the classifiation recommendation preview click
    handldClassificationPreviewClick = (e) => {
        let selectedClassificationPreview = e.target.offsetParent.attributes.value.nodeValue;
        console.log(selectedClassificationPreview);
        this.setState({
            //selectedClassificationFeature: selectedClassificationPreview
            drawerVisible: true,
        });
    };

    onDrawerClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    componentDidMount() {
        let color_scheme = this.props.color_scheme_name;
        this.setState({
            recommend_k: this.props.recommend_k,
            recommend_color: this.props.recommend_color,
            recommend_color_name: (color_scheme !== null) ? color_scheme : "Sequential: viridis"
        });
    }

    componentWillReceiveProps(nextProps, nextContext){
        let color_scheme = nextProps.color_scheme_name;
        this.setState({
            recommend_k: nextProps.recommend_k,
            recommend_color: nextProps.recommend_color,
            recommend_color_name: (color_scheme !== null) ? color_scheme : "Sequential: viridis"
        });
    }

    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        console.log(this.state);
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
                                maxGVF={maxGVF}
                                maxMoran={maxMoran}
                                dataFeatures={item}
                                onClassificationPreviewClick={this.handldClassificationPreviewClick}
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
                    style={{ position: 'absolute' }}
                    headerStyle={{height: 20}}
                    >
                    <p>Some contents...</p>
                </Drawer>
    
              </Card>
            );
        }

    }
}
export default ClassRecommend;