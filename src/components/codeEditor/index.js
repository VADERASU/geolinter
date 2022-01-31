import {Component} from "react";
import '../../styles/CodeEditor.css';
import {Card} from 'antd';

class CodeEditor extends Component {
    constructor(props){
        super(props);
    }

    /** class function section */

    /** render components */
    render(){
        return(
            <Card
                title='Vega-lite Script'
                size='small'
                className='cardDetail'
                style={{height: 760}}
            ></Card>
        );
    }
}
export default CodeEditor;