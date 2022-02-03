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
      /** end of vegalite script */
      /** vegaLite raw code */
      rawScript: case_scripts["state"],
      /** end of raw script */
    };
  }

  /** class functions */
  handleScriptRunClick = () => {
    let changedScript = JSON.parse(this.state.rawScript);
    this.setState({
      vegaLiteSpec: changedScript
    });
    //console.log(changedScript);
  };

  handleEditorChange =(newValue)=>{
    this.setState({
        rawScript: newValue
    });
    
  };

  handleCaseSelection = (selectedCase) => {
    //console.log(selectedCase);
    this.setState({
      selectRawCase: selectedCase,
      selectedCaseData:this.dataset[selectedCase],
      rawScript: case_scripts[selectedCase]
    });
  };

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
                    <Card
                    title='Recommendations'
                    size='small'
                    className='cardDetail'
                    style={{height: 355}}
                  ></Card>
                  </Col>
                </Row>
              </Col>

              {/** Right Main Col */}
              <Col span={6}>
                <Row gutter={[8,8]}>
                  
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
