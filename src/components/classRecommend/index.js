import React, {Component} from "react";
import {Card, List} from 'antd';
import ListRow from "./listElement";
import '../../styles/ClassRecommend.css';

class ClassRecommend extends Component {
    render(){
        const data = [];
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
        });
        //console.log(data);

        return(
            <Card
            title='Classification Recommendation'
            size='small'
            className='cardDetail'
            style={{height: 450}}
          >
            <List
                dataSource={data}
                renderItem={item =>(
                    <List.Item>
                        <ListRow
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