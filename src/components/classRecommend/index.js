import React, {Component} from "react";
import {Card, List} from 'antd';
import ListRow from "./listElement";

class ClassRecommend extends Component {
    render(){
        const data = [];
        let supportClassificationMethods = this.props.supportClassificationMethods;
        supportClassificationMethods.forEach(element => {
            let feature = {
                methodName: element,
                featureList: this.props.selectedCaseData.features[element]
            };
            data.push(feature);
        });
        console.log(this.props.selectedCaseData);

        return(
            <Card
            size='small'
            className='cardDetail'
            style={{height: 305}}
          >

          </Card>
        );
    }
}
export default ClassRecommend;