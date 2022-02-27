import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Space} from 'antd';
import 'd3-color';
import * as d3jnd from "d3-jnd";
import HardRulePanel from "./hardRule";
import ClassNumErr from "./classNumErr";

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
            let errTitle = "Too Few Classes Warning";
            this.setState({
                numOfClass: {
                    style: "block",
                    errTitle: errTitle
                }
            });
        }else if(k > 7){
            let errTitle = "Too Many Classes Warning";
            this.setState({
                numOfClass: {
                    style: "block",
                    errTitle: errTitle
                }
            });
        }

        // color scheme
        let color_scheme = mapSoftProp.color_scheme;
        let jndList = [];
        color_scheme.forEach((e,i)=>{
            if(i < color_scheme.length-1){
                let isJND = d3jnd.noticeablyDifferent(color_scheme[i], color_scheme[i+1], 0.5, 0.5);
                jndList.push(isJND);
            }
        });
        if(jndList.includes(false)){
            let errTitle = "Colors are not noticeably different";
            this.setState({
                fillColorScheme: {
                    style: "block",
                    errTitle: errTitle
                }
            });
        }

        // classification accuracy

        
    };

    componentDidMount() {
        let mapSoftProp = this.props.mapFeatureReady;
        console.log(mapSoftProp);
        if(mapSoftProp !== null){
            // check soft rule violations
            this.checkSoftViolations(mapSoftProp);
        }

    }

    componentWillReceiveProps(nextProps, nextContext){
        let mapSoftProp = nextProps.mapFeatureReady;
        if(mapSoftProp !== null){
            // check soft rule violations
            this.checkSoftViolations(mapSoftProp);
        }
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
                    <div style={{display: this.state.numOfClass.style}}>
                        <ClassNumErr 
                            mapFeatureReady={this.props.mapFeatureReady}
                            errProp={this.state.numOfClass.errTitle}
                            currentMapFeature={this.props.currentMapFeature}
                            colorList={this.props.colorList}
                            selectedCaseData={this.props.selectedCaseData}
                            onSoftFix={this.props.onSoftFix}
                        />   
                    </div>
                                  
                </div>   
              
            </Card>
        );
    }
}
export default LinterReport;