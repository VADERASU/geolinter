import React, {Component} from "react";
//import {Card} from 'antd';
import embed from 'vega-embed';

class SubMapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec, selectRawCase, selectProjType) => {
        if(selectRawCase === 'county_unemployment'){
            //console.log(selectedCaseData);
            spec.data.values = selectedCaseData.geo;
            //spec.transform[0].from.data.values = selectedCaseData.data.data;
            //change map proj
            if(selectProjType === "albersUsa"){
                spec.projection = {
                    "type": "albersUsa"
                };
            }else{
                spec.projection = {
                    "type": selectProjType,
                };
            }
            //console.log(spec);
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            })
            .catch((err)=>{
                console.log(err);
            });
        }else if(selectRawCase === 'state_education'){
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;

            //change map proj
            if(selectProjType === "albersUsa"){
                spec.projection = {
                    "type": "albersUsa"
                };
            }else{
                spec.projection = {
                    "type": selectProjType,
                };
            }
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            })
            .catch((err)=>{
                console.log(err);
            });
        }else if(selectRawCase === 'montreal_pop_density'){
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;

            //change map proj
            if(selectProjType === "albersUsa"){
                spec.projection = {
                    "type": "albersUsa"
                };
            }else{
                spec.projection = {
                    "type": selectProjType,
                };
            }

            //spec.projection.fit = selectedCaseData.geo.features;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                //console.log('Original Choropleth Map');
                
            })
            .catch((err)=>{
                //this.props.onVegaParseError(err, true);
                //console.log(err);
            });
            
        }else if(selectRawCase === 'georgia_pctBach'){

            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;

            //change map proj
            if(selectProjType === "albersUsa"){
                spec.projection = {
                    "type": "albersUsa"
                };
            }else{
                spec.projection = {
                    "type": selectProjType,
                };
            }

            //spec.projection.fit = selectedCaseData.geo.features;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                //console.log('Original Choropleth Map');
                
            })
            .catch((err)=>{
                //this.props.onVegaParseError(err, true);
                //console.log(err);
            });

        }else if(selectRawCase === 'chicago_income'){
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;

            spec.projection = {
                "type": selectProjType,
            };

            //spec.projection.fit = selectedCaseData.geo.features;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                //console.log('Original Choropleth Map');
                
            })
            .catch((err)=>{
                //this.props.onVegaParseError(err, true);
                //console.log(err);
            });
        }else if(selectRawCase === 'state_shipment' || selectRawCase === 'state_shipment_norm'){
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;

            spec.projection = {
                "type": "albersUsa",
            };

            //spec.projection.fit = selectedCaseData.geo.features;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                //console.log('Original Choropleth Map');
                
            })
            .catch((err)=>{
                //this.props.onVegaParseError(err, true);
                //console.log(err);
            });
        }else{
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;

            if(selectProjType === "albersUsa"){
                spec.projection = {
                    "type": "albersUsa"
                };
            }else{
                spec.projection = {
                    "type": selectProjType,
                };
            }

            //spec.projection.fit = selectedCaseData.geo.features;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                //console.log('Original Choropleth Map');
                
            })
            .catch((err)=>{
                //this.props.onVegaParseError(err, true);
                //console.log(err);
            });
        }

    };

    /** class function section */
    componentDidMount(){
        this.drawVegaMap(
            this.props.selectedCaseData, 
            this.props.vegaLiteSpec, 
            this.props.selectRawCase,
            this.props.selectProjType
        );
        //console.log(this.props);
    }

    componentDidUpdate(){
        this.drawVegaMap(
            this.props.selectedCaseData, 
            this.props.vegaLiteSpec, 
            this.props.selectRawCase,
            this.props.selectProjType
        );
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default SubMapGenerator;