import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card} from 'antd';

class LinterReport extends Component {
    render(){
        return(
            <Card
            title='Detected Violations'
            size='small'
            className='cardDetail'
            style={{height: 550}}
          >

          </Card>
        );
    }
}
export default LinterReport;