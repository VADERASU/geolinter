import React, {Component} from "react";
import embed from 'vega-embed';

class RecommendationPreviewMap extends Component {
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
                console.log(re);
            })
            .catch((err)=>{
                console.log(err);
            });
        }  
    };

    /** class function section */
    componentDidMount(){
        if(this.props.subMapSpec !== null){
            this.drawVegaMap(this.props.selectedCaseData, this.props.subMapSpec, this.props.selectRawCase);
        }
        
        //console.log(this.props);
    }

    componentDidUpdate(){
        if(this.props.subMapSpec !== null){
            this.drawVegaMap(this.props.selectedCaseData, this.props.subMapSpec, this.props.selectRawCase);    
        }
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default RecommendationPreviewMap;