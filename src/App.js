import {Component} from 'react';
import './styles/App.css';
import {Layout} from 'antd';
import {Row, Col, Card} from 'antd';
//import {Select, Slider, Switch, Empty} from 'antd';
/** import local components */
import NavBar from './components/nav_bar';
import CodeEditor from './components/codeEditor';
import StatusBar from './components/statusBar';
import MapLinter from './components/mapLinter';
import LinterReport from './components/linterReport';
import SupportMapView from './components/supportMapView';

/** Import test data, can be uploaded by users */
//import usstates from './resource/usstates.json'; //TOPOJSON
import state from './resource/state.json';

/** import case scripts */
import { case_scripts } from './resource/cases';

/** Main App class */
class App extends Component {
  constructor(props){
    super(props);
    
    this.dataset = {
      state: state
    };

    this.state = {
      mapDataList: ['state'],
      selectedCaseData: state,
      /** vegalite script */
      selectRawCase: "state",
      vegaLiteSpec: JSON.parse(case_scripts["state"]),
      /** vegaLite raw code */
      rawScript: case_scripts["state"],
      specOld: "",
      /** Code Editor View controller */
      codeEditorHide: false,
      codeDiffHide: true,
      editorView: "Editor"
    };
  }

  /** class functions */

  // When click the "Run Script" btn
  handleScriptRunClick = () => {
    // store the old spec string for the last step
    this.state.vegaLiteSpec.data.values = this.state.selectRawCase;
    let oldSpec = JSON.stringify(this.state.vegaLiteSpec, null, 4);
    this.setState({
      specOld: oldSpec
    });
    //parse the string spec into real Vega spec
    let changedScript = JSON.parse(this.state.rawScript);
    this.setState({
      vegaLiteSpec: changedScript
    });
    //show code diff by the code differ
    this.setState({
      codeEditorHide: true,
      codeDiffHide: false
    });
    //console.log(changedScript);
  };

  // when change the content in code editor
  handleEditorChange =(newValue)=>{
    this.setState({
        rawScript: newValue
    });
    
  };

  // When select a new case study
  handleCaseSelection = (selectedCase) => {
    //console.log(selectedCase);
    this.setState({
      selectRawCase: selectedCase,
      selectedCaseData:this.dataset[selectedCase],
      rawScript: case_scripts[selectedCase]
    });
  };

  // When switch between editor and diff viewer
  handleEditorViewSwitch = (switchKey) => {
    let newView = switchKey.target.value;
    this.setState({
      editorView: newView
    });
  }

  /** Render components for the main layout */
  render(){
    //console.log(this.state.geoData);
    const { Content } = Layout;
    /** extract cases and data name */

    return(
      <div className='App'>
        <Layout className='mainContainer'>
          {/** Nav bar, may deprecated */}
          {/**
           * <Header className='headContainer'>
            <NavBar />
          </Header>
           */}

          {/** Main layout of the system */}
          <Content className='vastContainer'>
            {/** Row #1 */}
            <Row gutter={8}>
              {/** Left Main Col */}
              <Col span={8}>
                <Row gutter={[8,8]}>
                {/** Nav Panel */}
                <Col span={24}>
                  <NavBar
                    mapDataList={this.state.mapDataList}
                    onCaseSelection={this.handleCaseSelection}
                  />
                </Col>
                {/** Vega-Lite Script Editor */}
                <Col span={24}>
                  <CodeEditor
                    vagaLiteSpecText={this.state.rawScript}
                    onScriptRunClick={this.handleScriptRunClick}
                    onEditorChange={this.handleEditorChange}
                    specOld={this.state.specOld}
                    editorView={this.state.editorView}
                    onEditorViewSwitch={this.handleEditorViewSwitch}
                  />
                </Col>
                  <Col span={24}>
                      <StatusBar />
                  </Col>
                </Row>
              </Col>

              {/** Middle Main Col */}
              <Col span={10}>
                <Row gutter={[8,8]}>
                  <Col span={24}>
                    <MapLinter
                      selectedCaseData={this.state.selectedCaseData}
                      vegaLiteSpec={this.state.vegaLiteSpec}
                    />
                  </Col>
                  <Col span={24}>
                    <LinterReport />
                  </Col>
                </Row>
              </Col>

              {/** Right Main Col */}
              <Col span={6}>
                <Row gutter={[8,8]}>
                  <Col span={24}>
                    <SupportMapView />
                  </Col>
                </Row>
              </Col>

            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
