import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Space} from 'antd';
import 'd3-color';
import * as d3jnd from "d3-jnd";
import HardRulePanel from "./hardRule";
import SoftRulePanel from "./softRule";

class LinterReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            numOfClass: {
                style: "block",
                errTitle: null
            },
            classificationAcc: {
                style: "none",
                errTitle: null
            },
            fillColorScheme: {
                style: "none",
                errTitle: null
            },
            mapProjection: {
                style: "none",
                errTitle: null
            },
            borderColor: {
                style: "none",
                errTitle: null
            },
            borderBorderWidth: {
                style: "none",
                errTitle: null
            },
            backgroundColor: {
                style: "none",
                errTitle: null
            },
        };
    }

    checkSoftViolations = (mapSoftProp) => {
        // check # of class
        let k = mapSoftProp.k;
        if(k < 3){
            let errTitle = "Too Few Class Warning";
            this.setState({
                numOfClass: {
                    style: "block",
                    errTitle: errTitle
                }
            });
        }else if(k > 7){
            let errTitle = "Too Many Class Warning";
            this.setState({
                numOfClass: {
                    style: "block",
                    errTitle: errTitle
                }
            });
        }

        // color scheme
        let color_scheme = mapSoftProp.color_scheme;
        console.log(color_scheme);
        
        // classification accuracy

        
    };

    componentDidMount() {
        let mapSoftProp = this.props.mapFeatureReady;
        console.log(mapSoftProp);
        // check soft rule violations
        this.checkSoftViolations(mapSoftProp);

    }

    componentWillReceiveProps(nextProps, nextContext){
        let mapSoftProp = nextProps.mapFeatureReady;
        // check soft rule violations
        this.checkSoftViolations(mapSoftProp);
    }
    
    render(){
        
        return(
            <Card
                title='Detected Violations'
                size='small'
                className='cardDetail'
                style={{height: 505}}
            >
                <div
                    className="linterReport"
                >
                    <HardRulePanel 
                        hasHardRuleViolation={this.props.hasHardRuleViolation}
                        hardRuleMsg={this.props.hardRuleMsg}
                        onHardRuleFixClick={this.props.onHardRuleFixClick}
                    />

                    {/** # of class fix */}
                    <div style={{display: this.state.numOfClass}}>
                        <SoftRulePanel 
                            mapFeatureReady={this.props.mapFeatureReady}
                        />   
                    </div>
                                  
                </div>   
              
            </Card>
        );
    }
}
export default LinterReport;