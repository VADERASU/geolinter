import React, {Component} from "react";
//import {Card} from 'antd';
import embed from 'vega-embed';

class SubMapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec, selectRawCase, selectProjType, center0, center1, scale) => {
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

            //change map proj
            let center = [center0, center1];
            if(selectProjType === "albersUsa"){
                spec.projection = {
                    "type": "albersUsa"
                };
            }else{
                spec.projection = {
                    "type": selectProjType,
                    "center": center,
                    "scale": scale
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
        }  
    };

    /** class function section */
    componentDidMount(){
        this.drawVegaMap(
            this.props.selectedCaseData, 
            this.props.vegaLiteSpec, 
            this.props.selectRawCase,
            this.props.selectProjType,
            this.props.center0,
            this.props.center1,
            this.props.scale
        );
        //console.log(this.props);
    }

    componentDidUpdate(){
        this.drawVegaMap(
            this.props.selectedCaseData, 
            this.props.vegaLiteSpec, 
            this.props.selectRawCase,
            this.props.selectProjType,
            this.props.center0,
            this.props.center1,
            this.props.scale
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