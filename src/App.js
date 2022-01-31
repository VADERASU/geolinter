import {Component} from 'react';
import './styles/App.css';
import {Layout} from 'antd';
import {Row, Col, Card} from 'antd';
//import {Select, Slider, Switch, Empty} from 'antd';
import NavBar from './components/nav_bar';

/** Import test data, can be uploaded by users */

/** Main App class */
class App extends Component {
  constructor(props){
    super(props);
  }

  /** Render components for the main layout */
  render(){
    
    const { Header, Content } = Layout;

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
              {/** Vega-lite script editor */}
              <Col span={8}>
                <Row gutter={[8,8]}>
                {/** Nav Panel */}
                <Col span={24}>
                  <NavBar />
                </Col>
                <Col span={24}>
                    <Card
                        title='Vega-lite Script'
                        size='small'
                        className='cardDetail'
                        style={{height: 760}}
                      ></Card>
                  </Col>
                  <Col span={24}>
                      <Card
                      title='Status Bar & Global Options'
                      size='small'
                      className='cardDetail'
                      style={{height: 200}}
                      ></Card>
                  </Col>
                </Row>
              </Col>

              {/** Middle Col for detected flaws (R2) and Finetunings */}
              <Col span={16}>
                <Row gutter={[8,8]}>
                  <Col span={24}>
                    <Card
                    title='Detected Flaws (R2) '
                    size='small'
                    className='cardDetail'
                    style={{height: 700}}
                  ></Card>
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


            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
