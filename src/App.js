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
import usstates from './resource/usstates.json';
import state from './resource/state.json';

/** Main App class */
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      geoData: usstates,
      testData: state,
    };
  }

  /** Render components for the main layout */
  render(){
    //console.log(this.state.geoData);
    const { Content } = Layout;

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
                  <CodeEditor />
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
                      geoData={this.state.geoData}
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
