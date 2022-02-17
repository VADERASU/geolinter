import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button} from 'antd';

class HardRulePanel extends Component {

    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        let hardRuleMsg = this.props.hardRuleMsg;
        console.log(hardRuleMsg);
        if(!hasHardRuleViolation){
            return(
                <Alert
                    message="No parsing error"
                    type="success"
                    showIcon
                    closable
                />
            );
        }else{
            return(
                <Card
                title='Parsing errors'
                size='small'
                className='hardRuleCard'
                //style={{height: 450}}
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
                         danger
                         style={{
                            float:'left',
                            marginTop: 7,
                            marginRight: 5
                        }}
                        >
                            Fix
                        </Button>
                    </div>
                }
              >
                  {/** Card Content */}
                  {hardRuleMsg.map((msg,i)=>{
                      return (
                        <Card.Grid hoverable={false} className='cardGrid' key={i}>
                            {msg.title} <br/>
                            {msg.text}
                        </Card.Grid>
                      )
                  })}
              </Card>
            );
        }
    }
}
export default HardRulePanel;