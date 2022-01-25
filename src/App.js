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
          {/** Nav bar */}
          <Header className='headContainer'>
            <NavBar />
          </Header>

          {/** Main layout of the system */}
          <Content className='vastContainer'>
            {/** Row #1 */}
            <Row gutter={8}>
              {/** Vega-lite script editor */}
              <Col span={8}>
                <Card
                  title='Script'
                  size='small'
                  className='cardDetail'
                  style={{height: 900}}
                ></Card>
              </Col>
              {/** Middle Col for detected flaws and recommendations */}
              <Col span={8}>
                <Row gutter={8}>
                  <Col span={24}>
                    <Card
                    title='Script'
                    size='small'
                    className='cardDetail'
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
