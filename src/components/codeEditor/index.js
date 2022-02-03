import {Component} from "react";
import '../../styles/CodeEditor.css';
import {Card, Button} from 'antd';
/** import code editor */
import EditorPanel from "./codeEditor";

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
                height: "750px",
                width: "615px",
                annotations: [{ row: 10, column: 3, type: 'error', text: 'Some error.'}]
            },
            classDef: null

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
                <EditorPanel
                    vagaLiteSpecText={this.props.vagaLiteSpecText}
                    onEditorChange={this.props.onEditorChange}
                    codeEditorOpt={this.state.codeEditorOpt}
                    classDef={this.state.classDef}
                />
            </Card>
        );
    }
}
export default CodeEditor;