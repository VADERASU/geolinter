import {Component} from "react";
import '../../styles/MapLinter.css';
import {Card, Divider, Row, Col} from 'antd';
import MapGenerator from "./mapGenerator";
import MainMapHistogram from "./mainMapHist";

class MapLinter extends Component {
    constructor(props){
        super(props);
    }

    /** class function section */
    componentDidMount(){
        //console.log(this.props);
    }

    /** render components */
    /** TODO: should add the vis design between two maps */
    render(){
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
export default MapLinter;