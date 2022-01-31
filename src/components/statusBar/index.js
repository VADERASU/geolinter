import {Component} from "react";
import '../../styles/StatusBar.css';
import {Card} from 'antd';

class StatusBar extends Component {
    constructor(props){
        super(props);
    }

    /** class function section */

    /** render components */
    render(){
        return(
            <Card
                title='Status Bar & Global Options'
                size='small'
                className='cardDetail'
                style={{height: 200}}
            ></Card>
        );
    }
}
export default StatusBar;