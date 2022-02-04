import React, {Component} from "react";
import '../../styles/CodeEditor.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";

class EditorPanel extends Component{
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    addAnnotation = () => {
        const editor = this.canvasRef.current.editor;
        const annotations = [{
            row: 19,
            column: 0,
            text: "Error or warning msg",
            type: "warning" // also warning and information and error
        }];
        editor.getSession().setAnnotations(annotations);
    };

    componentDidMount(){
        //console.log(this.props);
        this.addAnnotation();
    }

    componentDidUpdate(){
        this.addAnnotation();
    }

    render(){
        let markers = [];
        markers.push({startRow: 19, startCol: 4, endRow: 22, endCol: 50, className: 'myMarker', type: 'text' });
        
        return(
            <div className={this.props.editorView}>
                <AceEditor
                ref={this.canvasRef}
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
                markers={markers}
            />
            </div> 
        );
    }
}
export default EditorPanel;