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
            spec.transform[0].from.data.values = selectedCaseData.data.data;
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

            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log('Choropleth Map with Deceptive Designs');
            })
            .catch((err)=>{
                this.props.onVegaParseError(err, true);
                //console.log(err);
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
export default MapGenerator;