import {Component} from "react";
import '../../styles/StatusBar.css';
import {Card, Steps} from 'antd';

class StatusBar extends Component {
    constructor(props){
        super(props);
    }

    /** class function section */

    /** render components */
    render(){

        const { Step } = Steps;

        return(
            <Card
                title='Status Bar & Global Options'
                size='small'
                className='cardDetail'
                style={{height: 198}}
            >
                <Steps 
                    size="small"
                    current={1}
                    style={{
                        marginTop: 10,
                        width: 500
                    }}
                >
                    <Step title="Finished" description="Hard rules check" />
                    <Step title="In Progress" description="Fix deceptive design" />
                    <Step title="Waiting" description="Finetuning" />
                </Steps>
            </Card>
        );
    }
}
export default StatusBar;