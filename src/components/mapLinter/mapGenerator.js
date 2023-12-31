import React, {Component} from "react";
import '../../styles/MapLinter.css';
//import {Card} from 'antd';
import embed from 'vega-embed';

class MapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec, selectRawCase) => {

        if(selectRawCase === 'county_unemployment'){

            spec.data.values = selectedCaseData.geo;
            //spec.transform[0].from.data.values = selectedCaseData.data.data;
            //console.log(spec);
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            })
            .catch((err)=>{
                //console.log(err);
            });

        }else if(selectRawCase === 'state_shipment_norm'){
            /** SPATICL CASE 1 with un classed map */
            let unclass_spec_string = 
            `{
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "width": 550,
                "height": 300,
                "background": "#F3F8FB",
                "title": "Value of Freight Shipments by State: 2002",
                "data": {
                    "values": "state_shipment",
                    "format": {
                        "property": "features"
                    }
                },
                "mark": "geoshape",
                "projection": {
                    "type": "albersUsa"
                },
                "encoding": {
                    "stroke": {
                        "value": "black"
                    },
                    "strokeWidth": {
                        "value": 1
                    },
                    "color": {
                        "field": "properties.shipment",
                        "type": "quantitative",
                        "scale": {
                            "range": ["#ffffff","#D9E6EB","#BAC9C9","#BAC9d4","#151719"],
                            "type": "threshold",
                            "domain": [50, 249, 399, 600]
                        },
                        "legend": {
                            "title": "billion $"
                        }
                    }         
                },
                "usermeta": {
                    "embedOptions": {
                        "actions": false
                    }
                }
            }`;

            let unclass_spec = JSON.parse(unclass_spec_string);
            unclass_spec.data.values = this.props.state_shipment;
            /** Preprocess the vega spec */
            //spec.data.values = selectedCaseData.geo;
            //spec.projection.fit = selectedCaseData.geo.features;
            const result = embed(this.canvasRef.current, unclass_spec)
            .then((re)=>{
                // result should be stored into the state
                //console.log('Original Choropleth Map');
                
            })
            .catch((err)=>{
                this.props.onVegaParseError(err, true);
                //console.log(err);
            });

        }else if(selectRawCase === 'montreal_pop_density'){
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData.geo;
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
        if(this.props.selectRawCase !== null){
            this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec, this.props.selectRawCase);
        }
        
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.selectRawCase !== null){
            this.drawVegaMap(nextProps.selectedCaseData, nextProps.vegaLiteSpec, nextProps.selectRawCase);
        }
        
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default MapGenerator;