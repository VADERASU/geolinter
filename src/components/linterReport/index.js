import React, {Component} from "react";
import "../../styles/LinterReport.css"
import {Card, Alert, Button, Space} from 'antd';
import 'd3-color';
import * as d3jnd from "d3-jnd";
import HardRulePanel from "./hardRule";
import ClassNumErr from "./classNumErr";
import ClassAccuErr from "./classAccuErr";
import FillColorErr from "./fillColorScheme";
import MapProjection from "./mapProj";
import MapOptions from "./mapOptions";

class LinterReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            numOfClass: {
                style: "none",
                has: false,
                errTitle: null
            },
            classificationAcc: {
                style: "none",
                has: false,
                errTitle: null
            },
            fillColorScheme: {
                style: "none",
                has: false,
                errTitle: null
            },
            mapProjection: {
                style: "none",
                has: false,
                errTitle: null
            },
            borderColor: {
                style: "none",
                has: false,
                errTitle: null
            },
            borderBorderWidth: {
                style: "none",
                has: false,
                errTitle: null
            },
            backgroundColor: {
                style: "none",
                has: false,
                errTitle: null
            },
            originalGVF: 0,
            originalMoran: 0,
        };
    }

    round = (num) => {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    };

    checkSoftViolations = (mapSoftProp, selectedCaseData, originGVF) => {
        let dictTemp = {
            numOfClass: {
                style: "none",
                has: false,
                errTitle: null
            },
            classificationAcc: {
                style: "none",
                has: false,
                errTitle: null
            },
            fillColorScheme: {
                style: "none",
                has: false,
                errTitle: null
            },
            mapProjection: {
                style: "none",
                has: false,
                errTitle: null
            },
            borderColor: {
                style: "none",
                has: false,
                errTitle: null
            },
            borderBorderWidth: {
                style: "none",
                has: false,
                errTitle: null
            },
            backgroundColor: {
                style: "none",
                has: false,
                errTitle: null
            },
        };

        // check # of class
        let k = mapSoftProp.k;
        if(k < 3){
            let errTitle = "Too few classes";
            dictTemp.numOfClass.style = "block";
            dictTemp.numOfClass.has = true;
            dictTemp.numOfClass.errTitle = errTitle;
            
        }else if(k > 7){
            let errTitle = "Too many classes";
            dictTemp.numOfClass.style = "block";
            dictTemp.numOfClass.has = true;
            dictTemp.numOfClass.errTitle = errTitle;
        }

         // classification accuracy
         //let originGVF = this.state.originalGVF;
         let GVFsum = 0;
         let methodNum = 0;
         let classification_methods_title = selectedCaseData.features.classification_methods_title;
         classification_methods_title.forEach((element, i)=>{
             let keyName = selectedCaseData.features.classification_methods[i];
             let currentFeature = selectedCaseData.features[keyName];
             let featureWithCurrentK = currentFeature.filter(element => element.k === k);
             
             if(featureWithCurrentK.length > 0){
                 GVFsum = featureWithCurrentK[0].GVF + GVFsum;
                 methodNum = methodNum + 1;
             }
         });
         let GVFavg = GVFsum / methodNum;
         console.log(originGVF +", "+GVFavg);
         if(originGVF < GVFavg || originGVF === 0){
             let errTitle = "Classification accuracy is lower than the average ";
             if(originGVF === 0){
                errTitle = errTitle + "(original GVF: "+originGVF+")";
             }else{
                errTitle = errTitle + "(original GVF: "+originGVF+" < average GVF: "+this.round(GVFavg)+")";
             }
             dictTemp.classificationAcc.style = dictTemp.numOfClass.has ? "none" : "block";
             dictTemp.classificationAcc.has = true;
             dictTemp.classificationAcc.errTitle = errTitle;
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
            let displayFlag = true;
            if(dictTemp.numOfClass.has || dictTemp.classificationAcc.has){
                displayFlag = false;
            }
    
            dictTemp.fillColorScheme.style = displayFlag ? "block" : "none";
            dictTemp.fillColorScheme.has = true;
            dictTemp.fillColorScheme.errTitle = errTitle;
        }

        //console.log(dictTemp);
        this.setState({
            numOfClass: dictTemp.numOfClass,
            classificationAcc: dictTemp.classificationAcc,
            fillColorScheme: dictTemp.fillColorScheme,
        });
    };

    componentDidMount() {
        let mapSoftProp = this.props.mapFeatureReady;
        let selectedCaseData = this.props.selectedCaseData;
        this.setState({
            originalMoran: this.props.originalMoran,
            originalGVF: this.props.originalGVF
        });
        //console.log(mapSoftProp);
        if(mapSoftProp !== null){
            // check soft rule violations
            this.checkSoftViolations(mapSoftProp, selectedCaseData, this.props.originalGVF);
        }

    }

    componentWillReceiveProps(nextProps, nextContext){
        let mapSoftProp = nextProps.mapFeatureReady;
        let selectedCaseData = nextProps.selectedCaseData;
        this.setState({
            originalMoran: nextProps.originalMoran,
            originalGVF: nextProps.originalGVF
        });
        if(mapSoftProp !== null){
            // check soft rule violations
            this.checkSoftViolations(mapSoftProp, selectedCaseData, nextProps.originalGVF);
        }
        
    }
    
    render(){
        console.log(this.state);
        let selectedCaseData = this.props.selectedCaseData;
        const data = [];
        let classification_methods_title = selectedCaseData.features.classification_methods_title;
        classification_methods_title.forEach((element, i)=>{
            let keyName = selectedCaseData.features.classification_methods[i];
            let currentFeature = selectedCaseData.features[keyName];
            let k = 3;
            let feature = {
                methodName: element,
                featureList: currentFeature,
                maxVal: selectedCaseData.features.max,
                minVal: selectedCaseData.features.min,
            };
            let featureWithCurrentK = currentFeature.filter(element => element.k === k);
            if(featureWithCurrentK.length === 0){
                // dont have results in the current number of class
                feature.hasResult = false;
                feature.GVF = -1;
                feature.moran = -1;
            }else{
                //sort the methods based on GVF
                feature.hasResult = true;
                feature.GVF = featureWithCurrentK[0].GVF;
                feature.moran = featureWithCurrentK[0].moran;
            }
            if(data.length === 0){
                data.push(feature);    
            }else{
                let max_i = -1;
                let flag = true;
                data.forEach((e,i)=>{
                    if(feature.GVF > e.GVF && flag === true){
                        max_i = i;
                        flag = false;
                    }
                });

                if(max_i !== -1){
                    data.splice(max_i, 0, feature);
                }else{
                    data.push(feature);
                } 
            }

        });

        // case1 state_education
        if(this.props.selectRawCase === 'state_education'){
            return(
                <Card
                title='Detected Violations'
                size='small'
                className='cardDetail'
                style={{height: 505, overflow: "scroll"}}
                >
                    <HardRulePanel 
                        hasHardRuleViolation={this.props.hasHardRuleViolation}
                        hardRuleMsg={this.props.hardRuleMsg}
                        onHardRuleFixClick={this.props.onHardRuleFixClick}
                    />

                    {/** # of class fix */}
                        <ClassNumErr 
                            mapFeatureReady={this.props.mapFeatureReady}
                            errProp={this.state.numOfClass.errTitle}
                            errColor={this.state.fillColorScheme.errTitle}
                            errAccu={this.state.classificationAcc.errTitle}
                            classificationList={data}

                            currentSelectRecomm={this.props.currentSelectRecomm}

                            colorList={this.props.colorList}
                            selectedCaseData={this.props.selectedCaseData}
                            onSoftFix={this.props.onSoftFix}
                            originalGVF={this.props.originalGVF}
                            originalMoran={this.props.originalMoran}
                            onRecommendMethodSelection={this.props.onRecommendMethodSelection}
                        />   
                    
                    <Alert
                        message="Please check and select the projection with the least distortion of the map in the global options window."
                        type="info"
                        style={{marginTop: 8}}
                        showIcon
                    />

                    <Alert
                        message="Please properly define the strock color, width and background color of the map in the global options window."
                        type="info"
                        style={{marginTop: 8}}
                        showIcon
                    />

                    {/** map projection adjustment 
                    <div style={{marginTop: 5}}>
                        <MapProjection 
                            mapFeatureReady={this.props.mapFeatureReady}
                            onMapProjChange={this.props.onMapProjChange}
                        />
                    </div>*/}

                    {/** other map adjustment 
                    <div style={{marginTop: 5}}>
                        <MapOptions 
                            mapFeatureReady={this.props.mapFeatureReady}
                            mapOptionSetting={this.props.mapOptionSetting}
                        />
                    </div>*/}
                
              
            </Card>
            );
        }else if(this.props.selectRawCase === 'montreal_pop_density'){
            return(
                <Card
                title='Detected Violations'
                size='small'
                className='cardDetail'
                style={{height: 505, overflow: "scroll"}}
                >
                    <HardRulePanel 
                        hasHardRuleViolation={this.props.hasHardRuleViolation}
                        hardRuleMsg={this.props.hardRuleMsg}
                        onHardRuleFixClick={this.props.onHardRuleFixClick}
                    />

                    <ClassAccuErr 
                        mapFeatureReady={this.props.mapFeatureReady}
                        errColor={this.state.fillColorScheme.errTitle}
                        errAccu={this.state.classificationAcc.errTitle}
                        classificationList={data}

                        currentSelectRecomm={this.props.currentSelectRecomm}

                        colorList={this.props.colorList}
                        selectedCaseData={this.props.selectedCaseData}
                        onSoftFix={this.props.onSoftFix}
                        originalGVF={this.props.originalGVF}
                        originalMoran={this.props.originalMoran}
                        onRecommendMethodSelection={this.props.onRecommendMethodSelection}
                    />

                    <Alert
                        message="Please check and select the projection with the least distortion of the map in the global options window."
                        type="info"
                        style={{marginTop: 8}}
                        showIcon
                    />

                    <Alert
                        message="Please properly define the strock color, width and background color of the map in the global options window."
                        type="info"
                        style={{marginTop: 8}}
                        showIcon
                    />
            </Card>
            );
        }else{
            return(
                <Card
                title='Detected Violations'
                size='small'
                className='cardDetail'
                style={{height: 505, overflow: "scroll"}}
                >
                    <HardRulePanel 
                        hasHardRuleViolation={this.props.hasHardRuleViolation}
                        hardRuleMsg={this.props.hardRuleMsg}
                        onHardRuleFixClick={this.props.onHardRuleFixClick}
                    />


              
                </Card> 
            );
        }


        {/** classificationAcc fix 
                    <div style={{display: this.state.classificationAcc.style}}>
                        <ClassAccuErr 
                            hasErr={this.state.classificationAcc.style}
                            mapFeatureReady={this.props.mapFeatureReady}
                            errProp={this.state.classificationAcc.errTitle}
                            
                            colorList={this.props.colorList}
                            selectedCaseData={this.props.selectedCaseData}
                            onSoftFix={this.props.onSoftFix}
                        />
                    </div>*/}

                    {/** fillColorScheme fix 
                    <div style={{display: this.state.fillColorScheme.style}}>
                        <FillColorErr 
                            hasErr={this.state.fillColorScheme.style}
                            mapFeatureReady={this.props.mapFeatureReady}
                            errProp={this.state.fillColorScheme.errTitle}
                            
                            colorList={this.props.colorList}
                            onSoftFix={this.props.onSoftFix}
                        />
                    </div>*/}

        
    }
}
export default LinterReport;