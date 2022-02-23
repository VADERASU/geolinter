import React, {Component} from "react";
import {Card, List, Select, Empty, Slider, InputNumber} from 'antd';
import ListRow from "./listElement";
import '../../styles/ClassRecommend.css';

class ClassRecommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortMeasure: "GVF",
            recommend_k: 3,
            recommend_color: ['#5dc963', '#21918d', '#3b528b']
        };
    }

    handleSortMeasure = (value) => {
        //console.log(value);
        this.setState({
            sortMeasure: value
        });
    };

    componentDidMount() {
        this.setState({
            recommend_k: this.props.recommend_k,
            recommend_color: this.props.recommend_color
        });
    }

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            recommend_k: nextProps.recommend_k,
            recommend_color: nextProps.recommend_color
        });
    }

    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;

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
            const { inputValue } = this.state.recommend_k;
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
                    colorRange: this.props.vegaLiteSpec.encoding.color.scale.range,
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
    
            return(
                <Card
                title='Classification Recommendation'
                size='small'
                className='cardDetail'
                style={{height: 450}}
                extra={
                    <div
                        style={{
                            display: 'inline-block',
                            height: 40,
                            fontSize: 12
                        }}
                    >
                        <span
                            style={{
                                float:'left',
                                marginTop: 10,
                                marginRight: 5
                            }}
                        ># of class: </span>
                        
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
                                marginTop: '8px',
                                marginRight: '5px',
                                width: 100
                            }}
                            defaultValue="GVF"
                            onChange={this.handleSortMeasure}
                        >
                            {measureOption}
                        </Select>
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
                                onClassificationPreviewClick={this.props.onClassificationPreviewClick}
                            />
                        </List.Item>
                    )}
                />
    
              </Card>
            );
        }

    }
}
export default ClassRecommend;