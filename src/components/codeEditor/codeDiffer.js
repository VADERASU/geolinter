import {Component} from "react";
import '../../styles/CodeEditor.css';
import ReactDiffViewer from 'react-diff-viewer';

class CodeDiffer extends Component{
    render(){
        //const oldCode = this.props.specOld;
        const oldCode = 
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 730,
    "height": 400,
    "background": "#F3F8FB",
    "data": {
        "values": "state_data",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "albersUsa"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        }     
    },
    "usermeta": {
        "embedOptions": {
            "actions": {
                "export": true,
                "source": false,
                "compiled": false,
                "editor": false
            }
        }
    }
}`
        const newCode = this.props.vagaLiteSpecText;

        return(
            <div
                className="overFlowScroll"
                style={{height: 600}}
            >
                <ReactDiffViewer
                    oldValue={oldCode} newValue={newCode} splitView={false} 
                />
            </div>
        );
    }
}
export default CodeDiffer;