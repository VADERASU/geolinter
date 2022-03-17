import {Component} from "react";
import '../../styles/StatusBar.css';
import {Card, Steps, Button} from 'antd';
import GolbalOption from "./globalOption";

class StatusBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            //size: null,
            background: null,
            stroke: null,
            strokeWidth: null,
            title: null
        };
    }

    /** class function section */
    //mapOptionSetting={this.props.mapOptionSetting}
    handleTitleChange = (val) => {
        this.setState({
            title: val.target.value
        });
    };

    handleStrokeColor = (val) => {
        this.setState({
            stroke: val
        });
    };

    handleStrokeWidth = (val) => {
        this.setState({
            strokeWidth: val 
        });
    };

    handleBackground = (val) => {
        this.setState({
            background: val
        });
    }

    submitOption = () => {
        let option = {
            background: this.state.background,
            stroke: this.state.stroke,
            strokeWidth: this.state.strokeWidth,
            title: this.state.title
        };

        this.props.mapOptionSetting(option);
    }

    /** render components */
    render(){

        const { Step } = Steps;

        return(
            <Card
                title='Status & Global Options'
                size='small'
                className='cardDetail'
                style={{height: 298}}
                extra={
                    <div
                        style={{
                            display: 'inline-block',
                            height: 30,
                            fontSize: 10
                        }}
                    >
                        <Button
                         size="small" 
                         type="primary" 
                         style={{
                            float:'left',
                            width: 70,
                            marginTop: 5,
                            marginRight: 5
                        }}
                        onClick={this.submitOption}
                        >
                            Set
                        </Button>
                    </div>
                }
            >
                <GolbalOption 
                    background={this.state.background}
                    stroke={this.state.stroke}
                    strokeWidth={this.state.strokeWidth}
                    title={this.state.title}
                    onMapProjChange={this.props.onMapProjChange}
                    selectProjType={this.props.selectProjType}
                    onTitleChange={this.handleTitleChange}
                    handleStrokeColor={this.handleStrokeColor}
                    handleStrokeWidth={this.handleStrokeWidth}
                    handleBackground={this.handleBackground}
                    globalProjHighlight={this.props.globalProjHighlight}
                    globalColorHighlight={this.props.globalColorHighlight}
                />
                {/*<Steps 
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
                </Steps>*/}

            </Card>
        );
    }
}
export default StatusBar;