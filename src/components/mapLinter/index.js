import {Component} from "react";
import '../../styles/MapLinter.css';
import {Card, Divider, Row, Col, Empty} from 'antd';
import MapGenerator from "./mapGenerator";
import MainMapHistogram from "./mainMapHist";

class MapLinter extends Component {

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContext){
        
    }

    /** render components */
    /** TODO: should add the vis design between two maps */
    render(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
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
                    size='small'
                    className='cardDetail'
                    style={{height: 500}}
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
    
                    <Row>
                        <Col span={18}>
                        <MainMapHistogram
                            selectedCaseData={this.props.selectedCaseData}
                            vegaLiteSpec={this.props.vegaLiteSpec}
                        />
                        </Col>
                        <Col span={6}>
                            <Row>
                                <Col span={12}>
                                <span className="main-map-text-title"># of class: </span>
                                </Col>
                                <Col span={12}><b>5</b></Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                <span className="main-map-text-title">Data distribution info: </span>
                                </Col>
                                <Col span={12}><b>skewed distribution</b></Col>
                            </Row>
                            
                        </Col>
                    </Row>
                    
                </Card>
            );
        }
    }
}
export default MapLinter;