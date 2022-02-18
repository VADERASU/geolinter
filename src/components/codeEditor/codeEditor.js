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

    addAnnotation = (hardRuleMsg) => {
        const editor = this.canvasRef.current.editor;
        const annotations = [];
        hardRuleMsg.forEach(e=>{
            let anno = {
                row: e.lineNum-1,
                column: 0,
                text: e.text,
                type: "error" // also warning and information and error
            }
            annotations.push(anno);
        });
        
        editor.getSession().setAnnotations(annotations);
    };

    componentDidMount(){
        //console.log(this.props);
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        let hardRuleMsg = this.props.hardRuleMsg;
        const editor = this.canvasRef.current.editor;
        editor.getSession().setAnnotations([]);
        if(hasHardRuleViolation)
            this.addAnnotation(hardRuleMsg);
    }

    componentDidUpdate(){
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        let hardRuleMsg = this.props.hardRuleMsg;
        //console.log(hasHardRuleViolation);
        const editor = this.canvasRef.current.editor;
        editor.getSession().setAnnotations([]);
        if(hasHardRuleViolation)
            this.addAnnotation(hardRuleMsg);
    }

    render(){
        let markers = [];
        let hasHardRuleViolation = this.props.hasHardRuleViolation;
        let hardRuleMsg = this.props.hardRuleMsg;
        if(hasHardRuleViolation)
            hardRuleMsg.forEach(e=>{
                markers.push({startRow: e.lineNum-1, startCol: 0, endRow: e.lineNum-1, endCol: 300, className: 'myMarkerErr', type: 'text' });
            });
        
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