import {Component} from "react";
import '../../styles/CodeEditor.css';
import ReactDiffViewer from 'react-diff-viewer';

class CodeDiffer extends Component{
    render(){
        const oldCode = this.props.specOldText;
        
        const newCode = this.props.vagaLiteSpecText;

        return(
            <div
                className={this.props.editorView === "hidden" ? "overFlowScroll hidden" : "overFlowScroll"}
                style={{height: 640, fontSize: 10, marginTop: 10}}
            >
                <ReactDiffViewer
                    oldValue={oldCode} newValue={newCode} splitView={false} 
                />
            </div>
        );
    }
}
export default CodeDiffer;