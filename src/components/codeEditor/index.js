import {Component} from "react";
import '../../styles/CodeEditor.css';
import {Card, Button, Radio} from 'antd';
/** import code editor */
import EditorPanel from "./codeEditor";
import CodeDiffer from "./codeDiffer";

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
                height: "755px",
                width: "540px",
                annotations: [{ row: 10, column: 3, type: 'error', text: 'Some error.'}]
            },
            tabOptions: ['Editor', 'Diff Viewer']

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
                        <Radio.Group
                            size="small"
                            options={this.state.tabOptions}
                            value={this.props.editorView}
                            style={{
                                float:'left',
                                marginTop: 7,
                                marginRight: 5
                            }}
                            optionType="button"
                            onChange={this.props.onEditorViewSwitch}
                        />

                        <Button
                         size={'small'}
                         type="primary"
                         onClick={this.props.onScriptRunClick}
                         style={{
                            float:'left',
                            marginTop: 7,
                            marginRight: 5
                        }}
                        >
                            Run Script
                        </Button>
                        <span
                            style={{
                                float:'left',
                                marginTop: 10,
                                marginRight: 5
                            }}
                        ><b>Status Annotation Msg</b></span>
                        
                    </div>
                }
            >
                <EditorPanel
                    vagaLiteSpecText={this.props.vagaLiteSpecText}
                    onEditorChange={this.props.onEditorChange}
                    codeEditorOpt={this.state.codeEditorOpt}
                    editorView={this.props.editorView === "Editor" ? null : "hidden"}
                    hasHardRuleViolation={this.props.hasHardRuleViolation}
                    hardRuleMsg={this.props.hardRuleMsg}
                    //editorHeight={this.state.codeEditorHide ? "500px" : "750px"} // adjust the height
                />

                <CodeDiffer 
                    vagaLiteSpecText={this.props.vagaLiteSpecText}
                    specOld={this.props.specOld}
                    codeDiffHide={this.props.codeDiffHide}
                    editorView={this.props.editorView === "Editor" ? "hidden" : null}
                />
            </Card>
        );
    }
}
export default CodeEditor;