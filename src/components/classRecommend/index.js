import React, {Component} from "react";
import {Card, List, Select} from 'antd';
import ListRow from "./listElement";
import '../../styles/ClassRecommend.css';

class ClassRecommend extends Component {
    render(){
        
        const data = [];
        let maxGVF = '';
        let maxGVFindex = 0;
        let classification_methods_title = this.props.selectedCaseData.features.classification_methods_title;
        let classification_methods = this.props.selectedCaseData.features.classification_methods;
        classification_methods.forEach((element, i) => {
            let feature = {
                methodName: classification_methods_title[i],
                featureList: this.props.selectedCaseData.features[element],
                dataList: this.props.selectedCaseData.features.data_list,
                colorRange: this.props.vegaLiteSpec.encoding.color.scale.range,
                maxVal: this.props.selectedCaseData.features.max,
                minVal: this.props.selectedCaseData.features.min
            };
            data.push(feature);

            //get max GVF score
            let currentFeature = this.props.selectedCaseData.features[element];
            let k = this.props.vegaLiteSpec.encoding.color.scale.range.length;
            currentFeature.forEach(j=>{
                let name = classification_methods_title[i];
                if(j.k === k){
                    if(j.GVF > maxGVFindex){
                        maxGVFindex = j.GVF;
                        maxGVF = name;
                    }
                }
            });
        });
        //console.log(maxGVF);

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
export default ClassRecommend;