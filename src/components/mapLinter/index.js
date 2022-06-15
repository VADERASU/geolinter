import {Component} from "react";
import '../../styles/MapLinter.css';
import {Card, Divider, Row, Col, Empty} from 'antd';
import MapGenerator from "./mapGenerator";
import OriginalMapD3 from "./originMapD3";
import MainMapHistogram from "./mainMapHist";

class MapLinter extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps, nextContext){
       
    }

    /** render components */
    /** TODO: should add the vis design between two maps */
    render(){
        let projectionCheck = true;
        //console.log(hasHardRuleViolation);
        if(projectionCheck){
            return(
                <Card
                    title='Original Choropleth Map'
                    size='small'
                    className='cardDetail'
                    style={{height: 550}}
                >
                    <OriginalMapD3
                        selectedCaseData={this.props.selectedCaseData}
                        vegaLiteSpec={this.props.vegaLiteSpec}
                        selectRawCase={this.props.selectRawCase}
                        onVegaParseError={this.props.onVegaParseError}
                        mapFeatureReady={this.props.mapFeatureReady}
                    />
                    
                    <Divider
                        style={{marginTop: 5, marginBottom: 5}}
                    />
    
                    <MainMapHistogram
                        selectedCaseData={this.props.selectedCaseData}
                        vegaLiteSpec={this.props.vegaLiteSpec}
                    />
                    
                </Card>
            );
        }else{
            return(
                <Card
                    title='Original Choropleth Map'
                    size='small'
                    className='cardDetail'
                    style={{height: 550}}
                >
                    <MapGenerator
                        selectedCaseData={this.props.selectedCaseData}
                        vegaLiteSpec={this.props.vegaLiteSpec}
                        selectRawCase={this.props.selectRawCase}
                        onVegaParseError={this.props.onVegaParseError}
                    />
                    
                    <Divider
                        style={{marginTop: 5, marginBottom: 5}}
                    />
    
                    <MainMapHistogram
                        selectedCaseData={this.props.selectedCaseData}
                        vegaLiteSpec={this.props.vegaLiteSpec}
                    />
                    
                </Card>
            );
        }
    }
}
export default MapLinter;