import {Component} from "react";
import '../../styles/MapLinter.css';
import {Card, Divider} from 'antd';
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
                />

                <Divider
                    style={{marginTop: 5, marginBottom: 5}}
                />

                <MainMapHistogram
                    selectedCaseData={this.props.selectedCaseData}
                />
            </Card>
        );
    }
}
export default MapLinter;