import {Component} from 'react';
import './styles/App.css';
import {Layout} from 'antd';
import {Row, Col, Card, Divider} from 'antd';
//import {Select, Slider, Switch, Empty} from 'antd';
/** import local components */
import NavBar from './components/nav_bar';
import CodeEditor from './components/codeEditor';
import StatusBar from './components/statusBar';
import MapLinter from './components/mapLinter';
import LinterReport from './components/linterReport';
//import LinterCharts from './components/linterCharts';
import SupportMapView from './components/supportMapView';
import ClassRecommend from './components/classRecommend';

/** Import test data, can be uploaded by users */
// import case 1 data -> state-level education statics
import state_education from './resource/case1_state_edu/state_education.json';
import state_education_features from './resource/case1_state_edu/state_education_features.json';
// import case 2 data -> county-level unemployment statics
import us10m from './resource/us10m.json';
import unemployment from './resource/unemployment.json';

/** import case scripts */
import { case_scripts } from './resource/cases';

/** Main App class */
class App extends Component {
  constructor(props){
    super(props);
    
    this.dataset = {
      state_education:{
        geo: state_education,
        features: state_education_features
      },
      county_unemployment: {
        geo: us10m,
        data: unemployment,
        features: null
      }
    };

    this.initCaseObj = JSON.parse(case_scripts["state_education"]);
    this.initCaseObjString = JSON.stringify(this.initCaseObj, null, 4);

    this.state = {
      mapDataList: ['state_education','county_unemployment'],
      selectedCaseData: this.dataset['state_education'],

      /** vegalite script */
      selectRawCase: "state_education",
      vegaLiteSpec: JSON.parse(case_scripts["state_education"]),

      /** vegaLite raw code */
      //rawScript: case_scripts["state_education"],
      rawScript: this.initCaseObjString,
      specOld: "",

      /** Code Editor View controller */
      editorView: "Editor",

      /** for operation history map */
      specHistory: null,
      oldSelectRawCase: null,
      oldSelectedCaseData: null,
      showHistory: false,

      /** class recommendation selection */
      selectedClassificationFeature: null,
      defaultClassificationFeature: null,
      classificationMeasureList: ['GVF', 'Moran', 'ADCM', 'GADF'],

      /** Hard rules detection */
      hasHardRuleViolation: false,
      hardRuleMsg:[],

    };
  }

  /** class functions */

  // When click the "Run Script" btn
  handleScriptRunClick = () => {
    // store the old spec string for the last step
    this.state.vegaLiteSpec.data.values = this.state.selectRawCase;
    let specHistory = this.state.vegaLiteSpec;
    let oldSelectRawCase = this.state.selectRawCase;
    let oldSpec = JSON.stringify(this.state.vegaLiteSpec, null, 4);
    this.setState({
      specOld: oldSpec,
      specHistory: specHistory,
      oldSelectRawCase: oldSelectRawCase,
      oldSelectedCaseData: this.dataset[oldSelectRawCase],
      hasHardRuleViolation: false,
      hardRuleMsg: []
    });
    //parse the string spec into real Vega spec
    try{
      let changedScript = JSON.parse(this.state.rawScript);  
      this.setState({
        vegaLiteSpec: changedScript
      });
    }catch(err){
      //console.log(err);
      this.handleVegaParseError(err, false);
    }
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
    let specHistory = this.state.vegaLiteSpec;
    let oldSelectRawCase = this.state.selectRawCase;
    //console.log(selectedCase);
    this.setState({
      selectRawCase: selectedCase,
      selectedCaseData:this.dataset[selectedCase],
      rawScript: case_scripts[selectedCase],
      vegaLiteSpec: JSON.parse(case_scripts[selectedCase]),
      specHistory: specHistory,
      oldSelectRawCase: oldSelectRawCase,
      oldSelectedCaseData: this.dataset[oldSelectRawCase]
    });
  };

  // When switch between editor and diff viewer
  handleEditorViewSwitch = (switchKey) => {
    let newView = switchKey.target.value;
    this.setState({
      editorView: newView
    });
  }

  // handle the classifiation recommendation preview click
  handldClassificationPreviewClick = (e) => {
    let selectedClassificationPreview = e.target.offsetParent.attributes.value.nodeValue;
    //console.log(e.target.offsetParent.attributes.value.nodeValue);
    this.setState({
      selectedClassificationFeature: selectedClassificationPreview
    });
  };

  handleVegaParseError = (err, isVegaSpec) => {
    let hardRuleMsg = {
      title: "",
      type: "",
      text: "",
      lineNum: null
    };
    let hardRuleMsgList = [];
    if(isVegaSpec){ // spec hard error
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = ""; // replace with the msg in features.json

      hardRuleMsgList.push(hardRuleMsg);
      console.log(err);
      this.setState({
        hasHardRuleViolation: true,
        hardRuleMsg: hardRuleMsgList
      });
      
    }else{ // json syntax error
      hardRuleMsg.title = "SyntaxError: ";
      hardRuleMsg.type = "syntax";
      //hardRuleMsg.text = err.message;
      // get line number of the error
      let mseTemp = err.message.split(" ");
      hardRuleMsg.lineNum = mseTemp[mseTemp.length - 7]-1;
      // reconstruct the error msg
      let errorMsg = "";
      mseTemp.forEach((e, i)=>{
        if(i !== mseTemp.length - 5 && i !== mseTemp.length - 6){
          if(i === mseTemp.length - 7){
            errorMsg = errorMsg + (e-1) + " ";
          }else{
            errorMsg = errorMsg + e + " ";
          }
        }
      });
      hardRuleMsg.text = errorMsg;
      hardRuleMsgList.push(hardRuleMsg);
      // update the the hard errors in the state
      this.setState({
        hasHardRuleViolation: true,
        hardRuleMsg: hardRuleMsgList
      });
    }
  };

  getSpecLineNum = (specString, key) => {
    let index = specString.indexOf(key);
    let tempString = specString.substring(0, index);
    let lineNumber = tempString.split('\n').length;

    return lineNumber;
  }

  checkMapHardRule = (spec) => {
    let hardRuleViolation = [];
    spec.data.values = this.state.selectRawCase;
    let hasHardRuleViolation = false;

    //1. schema
    if(!("$schema" in spec)){
      let hardRuleMsg = {};
      hardRuleMsg.lineNum = 1;
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = "The specification should include the propertie <$schema>.";
      hardRuleMsg.fix = {
        parent: [],
        key: "$schema",
        value: "https://vega.github.io/schema/vega-lite/v5.json"
      };
      hardRuleMsg.fixSuggestion = "Add '$schema' with a value as a property of the specification.";
      hardRuleViolation.push(hardRuleMsg);
      hasHardRuleViolation = true;
    }
    if(!("format" in spec["data"])){
      let hardRuleMsg = {};
      let specString = JSON.stringify(spec, null, 4);
      let lineNum = this.getSpecLineNum(specString, "data");
      hardRuleMsg.lineNum = lineNum;
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = "The <data> property should include <format>.";
      hardRuleMsg.fix = {
        parent: ['data'],
        key: "format",
        value: {"property": "features"}
      };
      hardRuleMsg.fixSuggestion = "Add <'format': {'property': 'features'}> for the <data> property.";
      hardRuleViolation.push(hardRuleMsg);
      hasHardRuleViolation = true;
    }
    if(!("mark" in spec)){
      let hardRuleMsg = {};
      hardRuleMsg.lineNum = 1;
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = "The specification should include the propertie <mark: geoshape>.";
      hardRuleMsg.fix = {
        parent: [],
        key: "mark",
        value: "geoshape"
      };
      hardRuleMsg.fixSuggestion = "Add <'mark': 'geoshape'> for the specification.";
      hardRuleViolation.push(hardRuleMsg);
      hasHardRuleViolation = true;
    }
    if(!("field" in spec["encoding"]["color"])){
      let hardRuleMsg = {};
      let specString = JSON.stringify(spec, null, 4);
      let lineNum = this.getSpecLineNum(specString, "color");
      hardRuleMsg.lineNum = lineNum;
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = "The <encoding.color> property should have the property <field>.";
      hardRuleMsg.fix = {
        parent: ['encoding', 'color'],
        key: "field",
        value: "properties.higher_education_rate" //should be user-defined
      };
      hardRuleMsg.fixSuggestion = "Add <'field'> property with the corresponding data field from the GeoJSON data.";
      hardRuleViolation.push(hardRuleMsg);
      hasHardRuleViolation = true;
    }
    if(!("type" in spec["encoding"]["color"])){
      let hardRuleMsg = {};
      let specString = JSON.stringify(spec, null, 4);
      let lineNum = this.getSpecLineNum(specString, "color");
      hardRuleMsg.lineNum = lineNum;
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = "The <encoding.color> property should have the property <type>.";
      hardRuleMsg.fix = {
        parent: ['encoding', 'color'],
        key: "type",
        value: "quantitative" //should be user-defined
      };
      hardRuleMsg.fixSuggestion = "Add <'type': 'quantitative'> property to the <color> property.";
      hardRuleViolation.push(hardRuleMsg);
      hasHardRuleViolation = true;
    }else if(spec["encoding"]["color"]["type"] !== "quantitative"){
      let hardRuleMsg = {};
      let specString = JSON.stringify(spec, null, 4);
      let lineNum = this.getSpecLineNum(specString, "color")+2;
      hardRuleMsg.lineNum = lineNum;
      hardRuleMsg.title = "Invalid specification: ";
      hardRuleMsg.type = "spec";
      hardRuleMsg.text = "Invalid <encoding.color.type> value, please use 'quantitative' as the property value.";
      hardRuleMsg.fix = {
        parent: ['encoding', 'color'],
        key: "type",
        value: "quantitative" //should be user-defined
      };
      hardRuleMsg.fixSuggestion = "The value <encoding.color.type> property should be 'quantitative'.";
      hardRuleViolation.push(hardRuleMsg);
      hasHardRuleViolation = true;
    }

    return {hardRuleViolation, hasHardRuleViolation};
  };

  handleHardRuleFixClick = () => {
    let spec = this.state.vegaLiteSpec;
    let {hardRuleViolation, hasHardRuleViolation} = this.checkMapHardRule(spec);

    let specString = JSON.stringify(spec, null, 4);
    let rawObj = JSON.parse(specString);
    hardRuleViolation.forEach(e=>{
      let fix = e.fix;
      let obj_temp = {};
      if(fix.parent.length === 0){
        rawObj[fix.key] = fix.value;
      }else{
        fix.parent.forEach((e,i)=>{
          if(i === 0){
            obj_temp = rawObj[e];
          }else{
            obj_temp = obj_temp[e]
          }
        });
        obj_temp[fix.key] = fix.value;
      }
    });
    //console.log(rawObj);
    // update the vega spec state and the spec string in code editor
    this.setState({
      rawScript: JSON.stringify(rawObj, null, 4),
      vegaLiteSpec: rawObj
    });
  };

  extractMapFeatures = (spec) => {
    let mapFeature = {
      width: spec.width,
      height: spec.height,
      background: spec.background,
      //projection: spec.projection.type,
      //border_stroke: spec.encoding.stroke.value,
    };

    // check the class breaks and color scheme
    //default color scheme is viridis
    if("scale" in spec['encoding']['color']){
      mapFeature["color_scheme"] = spec.encoding.color.scale.range;
      mapFeature["breaks"] = spec.encoding.color.scale.domain;
      mapFeature['k'] = spec.encoding.color.scale.domain.length + 1;
      mapFeature['ifClassed'] = true;
    }else{
      // unclassed map
      mapFeature['ifClassed'] = false;
    }

    // check projection
    // https://vega.github.io/vega-lite/docs/projection.html
    if("projection" in spec){
      mapFeature['projection'] = spec.projection.type;
    }else{
      mapFeature['projection'] = "equalEarth";
    }

    //check encoding.stroke
    
  }; 

  /** Render components for the main layout */
  render(){
    const { Content } = Layout;
    /** Hard rule check for the spec properties */
    let spec = this.state.vegaLiteSpec;
    let {hardRuleViolation, hasHardRuleViolation} = this.checkMapHardRule(spec);
    //console.log(hardRuleViolation);
    //console.log(hasHardRuleViolation);
    let hardErrFlag = (this.state.hasHardRuleViolation || hasHardRuleViolation) ? true : false; 
    let hardErrMsg = this.state.hardRuleMsg.concat(hardRuleViolation);

    //TODO: Soft rule check
    if(!hardErrFlag){
      /** extract map features */
      
    }

    return(
      <div className='App'>
        <Layout className='mainContainer'>
          {/** Main layout of the system */}
          <Content className='vastContainer'>
            {/** Row #1 */}
            <Row gutter={6}>
              {/** Left Main Col */}
              <Col span={7}>
                <Row gutter={[6,6]}>
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
                      hasHardRuleViolation={hardErrFlag}
                      hardRuleMsg={hardErrMsg}
                    />
                  </Col>
                  <Col span={24}>
                      <StatusBar />
                  </Col>
                </Row>
              </Col>

              {/** Right Main Col */}
              <Col span={17}>
                <Row gutter={[6,6]}>

                  <Col span={24}>
                    <Row gutter={6}>
                      {/** Main Map*/}
                      <Col span={12}>
                        <MapLinter
                          selectRawCase={this.state.selectRawCase}
                          selectedCaseData={this.state.selectedCaseData}
                          vegaLiteSpec={this.state.vegaLiteSpec}
                          onVegaParseError={this.handleVegaParseError}
                          hasHardRuleViolation={hardErrFlag}
                        />
                      </Col>
                      
                      <Col span={12}>
                        <SupportMapView 
                          specHistory={this.state.specHistory}
                          oldSelectRawCase={this.state.oldSelectRawCase}
                          oldSelectedCaseData={this.state.oldSelectedCaseData}
                          selectRawCase={this.state.selectRawCase}
                          selectedCaseData={this.state.selectedCaseData}
                          vegaLiteSpec={this.state.vegaLiteSpec}
                          selectedClassificationFeature={this.state.selectedClassificationFeature}
                          showHistory={this.state.showHistory}
                          hasHardRuleViolation={hardErrFlag}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {/** Linter Components */}
                  <Col span={24}>
                    <Row gutter={6}>
                      <Col span={12}>
                        <LinterReport 
                           hasHardRuleViolation={hardErrFlag}
                           hardRuleMsg={hardErrMsg}
                           onHardRuleFixClick={this.handleHardRuleFixClick}
                        />
                      </Col>

                      <Col span={12}>
                        <Row>
                          <Col span={24}>
                            <div style={{height: 105}}></div>
                          </Col>
                          <Col span={24}>
                            <ClassRecommend
                              hasHardRuleViolation={hardErrFlag}
                              selectedCaseData={this.state.selectedCaseData}
                              vegaLiteSpec={this.state.vegaLiteSpec}
                              classificationMeasureList={this.state.classificationMeasureList}
                              onClassificationPreviewClick={this.handldClassificationPreviewClick}
                            />
                          </Col>
                        </Row>
                        
                      </Col>
                    </Row>
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
