import {Component} from "react";
import '../../styles/CodeEditor.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";

class EditorPanel extends Component{

    render(){
        return(
            <AceEditor
                value={this.props.vagaLiteSpecText}
                onChange={this.props.onEditorChange}
                placeholder={this.props.codeEditorOpt.placeholder}
                mode={this.props.codeEditorOpt.mode}
                theme={this.props.codeEditorOpt.theme}
                name="vegaCodeEditor"
                fontSize={this.props.codeEditorOpt.fontSize}
                showPrintMargin={this.props.codeEditorOpt.showPrintMargin}
                showGutter={this.props.codeEditorOpt.showGutter}
                highlightActiveLine={this.props.codeEditorOpt.highlightActiveLine}
                height={this.props.codeEditorOpt.height}
                width={this.props.codeEditorOpt.width}
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: this.props.codeEditorOpt.enableBasicAutocompletion,
                    enableLiveAutocompletion: this.props.codeEditorOpt.enableLiveAutocompletion,
                    enableSnippets: this.props.codeEditorOpt.enableSnippets,
                    showLineNumbers: this.props.codeEditorOpt.showLineNumbers,
                    tabSize: 2
                }}
                //className={this.props.classDef}
                className="hidden"
            />
        );
    }
}
export default EditorPanel;