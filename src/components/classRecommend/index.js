import React, {Component} from "react";
import {Card, List, Select, Empty} from 'antd';
import ListRow from "./listElement";
import '../../styles/ClassRecommend.css';

class ClassRecommend extends Component {
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
            const data = [];
            let maxGVF = '';
            let maxGVFindex = 0;
            let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
            let classification_methods = this.props.selectedCaseData.features.classification_methods;
            classification_methods.forEach((element, i) => {
                let currentFeature = this.props.selectedCaseData.features[element];
                let k = this.props.recommend_k;

                let feature = {
                    methodName: classification_methods_title[i],
                    featureList: currentFeature,
                    dataList: this.props.selectedCaseData.features.data_list,
                    colorRange: this.props.vegaLiteSpec.encoding.color.scale.range,
                    maxVal: this.props.selectedCaseData.features.max,
                    minVal: this.props.selectedCaseData.features.min,
                    recommend_k: this.props.recommend_k,
                    recommend_color: this.props.recommend_color
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

                //get max GVF score
                currentFeature.forEach(j=>{
                    let name = classification_methods_title[i];
                    if(j.k === k){
                        if(j.GVF > maxGVFindex){
                            maxGVFindex = j.GVF;
                            maxGVF = name;
                        }
                    }
                });

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
                
            });
            console.log(data);
    
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
                        <Select
                            mode="multiple"
                            size="small"
                            allowClear
                            style={{
                                float: 'left',
                                marginTop: '8px',
                                marginRight: '5px',
                                width: '100%'
                            }}
                            defaultValue={[
                                'GVF', 
                                'Moran'
                            ]}
                            placeholder="Please select measures"
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