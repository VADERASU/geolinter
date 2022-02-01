import React, {Component} from "react";
import '../../styles/MapLinter.css';
//import {Card} from 'antd';
import embed from 'vega-embed';
import { VegaLite } from 'react-vega'

class MapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (geoData, testData) => {
        //console.log(geoData);
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

        const spec1 = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            width: 600,
            height: 500,
            data: {
                values: testData,
                format: {
                    //type: "geojson",
                    property: "features"
                }
            },
            mark: 'geoshape',
            projection: {type: 'albersUsa'},
            encoding: {
                  stroke: {
                    value: "black"
                  },
            }
        };

        const result = embed(this.canvasRef.current, spec1)
            .then((re)=>{
                console.log(re);
            });
            
        
        
    };

    /** class function section */
    componentDidMount(){
        //this.drawVegaMap(this.props.geoData, this.props.testData);
        //console.log(this.props);
    }

    /** render components */
    render(){

        const spec = {
            //$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            width: 600,
            height: 500,
            data: {
                values: this.props.testData,
                format: {
                    property: "features"
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

        return(
            <div ref={this.canvasRef}>
               <VegaLite spec={spec} /> 
            </div>
        );
    }
}
export default MapGenerator;