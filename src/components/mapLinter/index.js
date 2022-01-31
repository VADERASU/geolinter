import {Component} from "react";
import '../../styles/MapLinter.css';
import {Card} from 'antd';
import MapGenerator from "./mapGenerator";

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
                style={{height: 700}}
            >
                <MapGenerator
                    geoData={this.props.geoData}
                />
            </Card>
        );
    }
}
export default MapLinter;