import React, {Component} from "react";
//import {Card} from 'antd';
import embed from 'vega-embed';

class SupportMapView extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec, selectRawCase) => {
        /* TOPOJSON!!!
        const spec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            width: 600,
            height: 500,
            data: {
                values: geoData,
                format: {
                    type: "topojson",
                    feature: "us_states"
                }
            },
            mark: 'geoshape',
            projection: {type: 'albersUsa'},
            encoding: {
                fill: {
                    field: "properties.STATE_ID",
                    scale: {"scheme": "greys"}
                  },
                  stroke: {
                    value: "black"
                  },
            }
        };
        */

        if(selectRawCase === 'county_unemployment'){

            spec.data.values = selectedCaseData.geo;
            spec.transform[0].from.data.values = selectedCaseData.data.data;
            console.log(spec);
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        }else{
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData;

            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        }  
        
    };

    /** class function section */
    componentDidMount(){
        this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec, this.props.selectRawCase);
        //console.log(this.props);
    }

    componentDidUpdate(){
        this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec, this.props.selectRawCase);
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default SupportMapView;