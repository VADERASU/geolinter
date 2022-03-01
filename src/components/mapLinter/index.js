import {Component} from "react";
import '../../styles/MapLinter.css';
import {Card, Divider, Row, Col, Empty} from 'antd';
import MapGenerator from "./mapGenerator";
import MainMapHistogram from "./mainMapHist";

class MapLinter extends Component {
    constructor(props){
        super(props);
        this.state = {
            propsSpec: null,
            selectedRawCase: null,
            selectedCaseData: null
        };
    }

    componentDidMount() {
        if(this.state.selectedRawCase === null){
            this.setState({
                propsSpec: this.props.vegaLiteSpec,
                selectedRawCase: this.props.selectRawCase,
                selectedCaseData: this.props.selectedCaseData
            });
        }else if(this.state.selectedRawCase !== this.props.selectRawCase){ //when user select a new case
            let selectRawCase = this.props.selectRawCase;
            this.setState({
                propsSpec: this.props.vegaLiteSpec,
                selectedRawCase: this.props.selectRawCase,
                selectedCaseData: this.props.selectedCaseData
            });
        } 
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(this.state.selectedRawCase === null){
            let selectRawCase = nextProps.selectRawCase;
            this.setState({
                propsSpec: nextProps.vegaLiteSpec,
                selectedRawCase: selectRawCase,
                selectedCaseData: nextProps.selectedCaseData
            });
            
        }else if(this.state.selectedRawCase !== this.props.selectRawCase){ //when user select a new case
            let selectRawCase = nextProps.selectRawCase;
            this.setState({
                propsSpec: nextProps.vegaLiteSpec,
                selectedRawCase: selectRawCase,
                selectedCaseData: nextProps.selectedCaseData
            });
            
        }
    }

    /** render components */
    /** TODO: should add the vis design between two maps */
    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        //console.log(hasHardRuleViolation);
        if(hasHardRuleViolation){
            return(
                <Card
                    size='small'
                    className='cardDetail'
                    style={{height: 500}}
                >
                    <Empty
                        style={{marginTop: 120}}
                        description={
                            <span>Please run the VEGA sript again
                            after fixing the invalid scripts</span>
                        }
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
                        selectedCaseData={this.state.selectedCaseData}
                        vegaLiteSpec={this.state.propsSpec}
                        selectRawCase={this.state.selectedRawCase}
                        onVegaParseError={this.props.onVegaParseError}
                    />
                    
                    <Divider
                        style={{marginTop: 5, marginBottom: 5}}
                    />
    
                    <MainMapHistogram
                        selectedCaseData={this.state.selectedCaseData}
                        vegaLiteSpec={this.state.propsSpec}
                    />
                    
                </Card>
            );
        }
    }
}
export default MapLinter;