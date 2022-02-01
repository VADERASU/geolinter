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
//import covid from './resource/covid.json';

/** Main App class */
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      //geoData: covid,
      testData: state,
      /** vegalite script */
      vegaLiteSpec:{},
      /** end of vegalite script */
      /** vegaLite raw code */
      rawScript:
`{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 730,
  "height": 400,
  "data": {
    "values": "testData",
    "format": {
      "property": "features"
    }
  },
  "mark": "geoshape",
  "projection": {"type": "albersUsa"},
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
}`,
      /** end of raw script */
    };
  }

  /** class functions */
  handleScriptRunClick = () => {
    let changedScript = JSON.parse(this.state.rawScript);
    console.log(changedScript);
  };

  handleEditorChange =(newValue)=>{
    this.setState({
        rawScript: newValue
    });
    
  };

  /** Render components for the main layout */
  render(){
    //console.log(this.state.geoData);
    const { Content } = Layout;
    //const vagaLiteSpecString = JSON.stringify(this.state.rawScript, null, 4);
    //const newJson = JSON.parse(vagaLiteSpecString);
    //console.log(newJson);
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
                  <NavBar />
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
                      //geoData={this.state.geoData}
                      testData={this.state.testData}
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
