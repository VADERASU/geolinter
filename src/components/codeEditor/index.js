import {Component} from "react";
import '../../styles/CodeEditor.css';
import {Card, Button} from 'antd';
/** import code editor */
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";



class CodeEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            codeEditorOpt:{
                //Placeholder text to be displayed when editor is empty
                placeholder: "Please enter your Vega-Lite script",
                theme: "xcode",
                mode: "json",
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                fontSize: 12,
                showGutter: true,
                showPrintMargin: true,
                highlightActiveLine: true,
                enableSnippets: true,
                showLineNumbers: true,
                height: "550px",
                width: "615px",
                annotations: [{ row: 10, column: 3, type: 'error', text: 'Some error.'}]
            },

        };
    }

    /** render components */
    render(){

        return(
            <Card
                title='Vega-lite Script'
                size='small'
                className='editorDetail'
                style={{height: 810}}
                extra={
                    <div style={{
                        display: 'inline-block',
                        height: 40, //250
                        //width: 300,
                        fontSize: 12
                        //paddingTop: 10
                    }}>
                        <Button
                         size={'small'}
                         type="primary"
                         onClick={this.props.onScriptRunClick}
                         style={{
                            float:'left',
                            marginTop: 7,
                            marginRight: 20
                        }}
                        >
                            Run Script
                        </Button>
                        <span
                            style={{
                                float:'left',
                                marginTop: 10,
                                marginRight: 20
                            }}
                        ><b>Status Annotation Msg</b></span>
                        
                    </div>
                }
            >
                <AceEditor
                    value={this.props.vagaLiteSpecText}
                    onChange={this.props.onEditorChange}
                    placeholder={this.state.codeEditorOpt.placeholder}
                    mode={this.state.codeEditorOpt.mode}
                    theme={this.state.codeEditorOpt.theme}
                    name="vegaCodeEditor"
                    fontSize={this.state.codeEditorOpt.fontSize}
                    showPrintMargin={this.state.codeEditorOpt.showPrintMargin}
                    showGutter={this.state.codeEditorOpt.showGutter}
                    highlightActiveLine={this.state.codeEditorOpt.highlightActiveLine}
                    height={this.state.codeEditorOpt.height}
                    width={this.state.codeEditorOpt.width}
                    setOptions={{
                        useWorker: false,
                        enableBasicAutocompletion: this.state.codeEditorOpt.enableBasicAutocompletion,
                        enableLiveAutocompletion: this.state.codeEditorOpt.enableLiveAutocompletion,
                        enableSnippets: this.state.codeEditorOpt.enableSnippets,
                        showLineNumbers: this.state.codeEditorOpt.showLineNumbers,
                        tabSize: 2
                    }}
                />
            </Card>
        );
    }
}
export default CodeEditor;