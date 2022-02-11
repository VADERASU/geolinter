import React, {Component} from "react";
//import {Card} from 'antd';
import embed from 'vega-embed';

class SubMapGenerator extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec, selectRawCase) => {
        
    };

    /** class function section */
    componentDidMount(){
        //this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec, this.props.selectRawCase);
        //console.log(this.props);
    }

    componentDidUpdate(){
        //this.drawVegaMap(this.props.selectedCaseData, this.props.vegaLiteSpec, this.props.selectRawCase);
    }

    /** render components */
    render(){

        return(
            <div ref={this.canvasRef}></div>
        );
    }
}
export default SubMapGenerator;