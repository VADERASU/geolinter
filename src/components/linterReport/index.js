import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Space} from 'antd';
import HardRulePanel from "./hardRule";
import SoftRulePanel from "./softRule";

class LinterReport extends Component {
    
    render(){
        
        return(
            <Card
                title='Detected Violations'
                size='small'
                className='cardDetail'
                style={{height: 555}}
            >
                <div
                    className="linterReport"
                >
                    <HardRulePanel 
                        hasHardRuleViolation={this.props.hasHardRuleViolation}
                        hardRuleMsg={this.props.hardRuleMsg}
                        onHardRuleFixClick={this.props.onHardRuleFixClick}
                    />   
                    
                    <SoftRulePanel 
                        mapFeatureReady={this.props.mapFeatureReady}
                    />                 
                </div>   
              
            </Card>
        );
    }
}
export default LinterReport;