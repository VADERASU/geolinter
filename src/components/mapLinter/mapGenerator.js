import React, {Component} from "react";
import '../../styles/MapLinter.css';
//import {Card} from 'antd';
import embed from 'vega-embed';

class MapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (geoData, testData) => {
        console.log(testData);
        
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

        const spec1 = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            width: 730,
            height: 400,
            //background: "#F3F8FB",
            data: {
                values: testData,
                format: {
                    property: "features"
                }
            },
            mark: 'geoshape',
            projection: {type: 'albersUsa'},
            encoding: {
                stroke: {
                    value: "black"
                },
                "color": {
                    "field": "id",
                    "type": "quantitative"
                }         
            },
            usermeta: {
                embedOptions: {
                    actions: {
                        export: true,
                        source: false,
                        compiled: false,
                        editor: false
                    },
                }
            }
        };

        const result = embed(this.canvasRef.current, spec1)
            .then((re)=>{
                console.log(re);
            });
            
        
        
    };

    /** class function section */
    componentDidMount(){
        this.drawVegaMap(this.props.geoData, this.props.testData);
        //console.log(this.props);
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default MapGenerator;