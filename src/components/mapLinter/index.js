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
    render(){
        return(
            <Card
                size='small'
                className='cardDetail'
                style={{height: 800}}
            >
                <MapGenerator
                    selectedCaseData={this.props.selectedCaseData}
                    vegaLiteSpec={this.props.vegaLiteSpec}
                    selectRawCase={this.props.selectRawCase}
                />

                <Divider />

                <MainMapHistogram />
            </Card>
        );
    }
}
export default MapLinter;