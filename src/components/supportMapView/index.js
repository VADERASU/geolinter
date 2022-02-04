import React, {Component} from "react";
import {Card} from 'antd';
import embed from 'vega-embed';

class SupportMapView extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawVegaMap = (selectedCaseData, spec, selectRawCase) => {
        if(selectRawCase === 'county_unemployment'){

            spec.data.values = selectedCaseData.geo;
            spec.transform[0].from.data.values = selectedCaseData.data.data;
            //console.log(spec);
            spec.height = 200;
            spec.width = 400;
            spec.encoding.color.legend = null;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        }else{
            /** Preprocess the vega spec */
            spec.data.values = selectedCaseData;
            spec.height = 200;
            spec.width = 400;
            spec.encoding.color.legend = null;
            const result = embed(this.canvasRef.current, spec)
            .then((re)=>{
                // result should be stored into the state
                console.log(re);
            });
        }  
    };

    /** class function section */
    componentDidMount(){
        if(this.props.oldSelectRawCase !== null){
            this.drawVegaMap(this.props.oldSelectedCaseData, this.props.specHistory, this.props.oldSelectRawCase);
        }
        
        //console.log(this.props);
    }

    componentDidUpdate(){
        if(this.props.oldSelectRawCase !== null){
            this.drawVegaMap(this.props.oldSelectedCaseData, this.props.specHistory, this.props.oldSelectRawCase);
        }
    }

    render(){
        return(
            <Card
            size='small'
            className='cardDetail'
            style={{
                height: 400,
                marginLeft: -8
            }}
          >
            <div ref={this.canvasRef}></div>
          </Card>
        );
    }
}
export default SupportMapView;