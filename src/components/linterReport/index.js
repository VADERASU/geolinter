import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Space} from 'antd';

class LinterReport extends Component {
    
    render(){
        const { ErrorBoundary } = Alert;
        return(
            <Card
            title='Detected Violations'
            size='small'
            className='cardDetail'
            style={{height: 555}}
          >
            <Alert
            style={{marginBottom: 10}}
            message="Success Tips"
            type="success"
            showIcon
            action={
                <Button size="small" type="text">
                UNDO
                </Button>
            }
            closable
            />
            
            <Alert
            style={{marginBottom: 10}}
                message="Hard rules violation"
                showIcon
                description="Grammar mistake...line: #"
                type="error"
                action={
                    <Button size="small" danger>
                    Auto Fix
                    </Button>
                }
            />

            <Alert
            style={{marginBottom: 10}}
                message="Soft rules detection results"
                description="Each row will display the detected soft rule volations, and provide some operation recommendations."
                type="warning"
                action={
                    <Space direction="vertical">
                    <Button size="small" type="primary">
                        Accept
                    </Button>
                    <Button size="small" danger type="ghost">
                        Decline
                    </Button>
                    </Space>
                }
                closable
                />

                <Alert
                    message="Some recommendations for finetunning"
                    description="Some optimization recommendations for the map finetuning"
                    type="info"
                    action={
                        <Space direction="vertical">
                        <Button size="small" type="primary">
                            Accept
                        </Button>
                        <Button size="small" danger type="ghost">
                            Decline
                        </Button>
                        </Space>
                    }
                    />          
              
          </Card>
        );
    }
}
export default LinterReport;