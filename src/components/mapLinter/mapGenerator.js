import React, {Component} from "react";
import '../../styles/MapLinter.css';
//import {Card} from 'antd';
import embed from 'vega-embed';

class MapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec) => {
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

        /** Preprocess the vega spec */
        spec.data.values = selectedCaseData;
        //console.log(spec);

        const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        
        
    };

    /** class function section */
    componentDidMount(){
        this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec);
        //console.log(this.props);
    }

    componentDidUpdate(){
        this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec);
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default MapGenerator;