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

    
    this.currentMapFeature = {
      k: null,
      color_scheme: null,
      color_scheme_name: null,
      high_GVF_name:null,
      high_moran_name: null,
      user_define_name: null
    };

    this.state = {
      mapDataList: ['state_education','county_unemployment'],
      selectedCaseData: this.dataset['state_education'],
      colorList: {
        name: [
          'Sequential: viridis', 
          'Sequential: reds', 
          'Sequential: greens', 
          'Sequential: YlGnBu',
          'Sequential: OrRd',
          'Diverging: RdBu', 
          'Diverging: PiYG',
        ],

        3: [
          ['#5dc963', '#21918d', '#3b528b'],
            ['#fee0d2','#fc9272','#de2d26'],
            ['#e5f5e0','#a1d99b','#31a354'],
            ['#edf8b1','#7fcdbb','#2c7fb8'],
            ['#fee8c8','#fdbb84','#e34a33'],
            ['#ef8a62','#f7f7f7','#67a9cf'],
            ['#e9a3c9','#f7f7f7','#a1d76a']
          ],

        4: [
          ['#7ad151', '#22a884', '#2a788e', '#414487'],
          ['#fee5d9','#fcae91','#fb6a4a','#cb181d'],
          ['#edf8e9','#bae4b3','#74c476','#238b45'],
          ['#ffffcc','#a1dab4','#41b6c4','#225ea8'],
          ['#fef0d9','#fdcc8a','#fc8d59','#d7301f'],
          ['#ca0020','#f4a582','#92c5de','#0571b0'],
          ['#d01c8b','#f1b6da','#b8e186','#4dac26']
        ],

        5: [
          ['#8fd744', '#35b779', '#21918d', '#31688e', '#443a83'],
          ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'],
          ['#edf8e9','#bae4b3','#74c476','#31a354','#006d2c'],
          ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494'],
          ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000'],
          ['#ca0020','#f4a582','#f7f7f7','#92c5de','#0571b0'],
          ['#d01c8b','#f1b6da','#f7f7f7','#b8e186','#4dac26']
        ],

        6: [
          ['#9fda3a', '#4ac26d', '#1fa187', '#27808e', '#375c8d', '#46327f'],
          ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15'],
          ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c'],
          ['#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#2c7fb8','#253494'],
          ['#fef0d9','#fdd49e','#fdbb84','#fc8d59','#e34a33','#b30000'],
          ['#b2182b','#ef8a62','#fddbc7','#d1e5f0','#67a9cf','#2166ac'],
          ['#c51b7d','#e9a3c9','#fde0ef','#e6f5d0','#a1d76a','#4d9221']
        ],

        7: [
          ['#abdc32', '#5dc963', '#28ae80', '#21918d', '#2c728e', '#3b528b', '#472d7b'],
          ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d'],
          ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#005a32'],
          ['#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84'],
          ['#fef0d9','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#990000'],
          ['#b2182b','#ef8a62','#fddbc7','#f7f7f7','#d1e5f0','#67a9cf','#2166ac'],
          ['#c51b7d','#e9a3c9','#fde0ef','#f7f7f7','#e6f5d0','#a1d76a','#4d9221']
        ],
      },

      /** vegalite script */
      selectRawCase: "state_education",
      vegaLiteSpec: JSON.parse(case_scripts["state_education"]),

      /** vegaLite raw code */
      //rawScript: case_scripts["state_education"],
      rawScript: this.initCaseObjString,
      specOld: JSON.parse(case_scripts["state_education"]),
      specOldText: this.initCaseObjString,

      /** Code Editor View controller */
      editorView: "Editor",

      /** for operation history map */
      specHistory: null,
      oldSelectRawCase: null,
      oldSelectedCaseData: null,
      showHistory: false,

      /** class recommendation selection */
      classificationMeasureList: ['GVF', 'Moran'],

      /** Hard rules detection */
      hasHardRuleViolation: false,
      hardRuleMsg:[],

      /** linter features */
      color_scheme_name: "Sequential: greens",
      softFixSpec: null,
      softRuleMsg:[],

      // map projection props
      selectProjType: "equalEarth",

      //original measures
      originalGVF: {
        state_education: 0
      },
      originalMoran: {
        state_education: 2.1
      },

    };
  }

  /** class functions */

  handleMapProjChange = (value) => {
    this.setState({
        selectProjType: value
    });
  };

  // dynamically set selected recommendations
  handldCurrentRecommendChange = (k, color, color_name, gvfName, moranName) => {
    this.setState({
      currentMapFeature:{
        k: k,
        color_scheme: color,
        color_scheme_name: color_name,
        high_GVF_name: gvfName,
        high_moran_name: moranName
      }
    });
  };

  handleCurrentMeasuresChange = (gvfName, moranName) => {
    this.currentMapFeature.high_GVF_name = gvfName;
    this.currentMapFeature.high_moran_name = moranName;
  };

  handleCurrentColorChange = (color, color_name) => {
    this.currentMapFeature.color_scheme = color;
    this.currentMapFeature.color_scheme_name = color_name;
  };

  handleCurrentKChange = (k) => {
    this.currentMapFeature.k = k
  };

  handleSoftFix = (info) => {
    this.setState({
      softFixSpec: info
    });
    this.state.vegaLiteSpec.data.values = this.state.selectRawCase;
    let specTemp = JSON.parse(JSON.stringify(this.state.vegaLiteSpec));
    specTemp.encoding.color.scale.domain = info.breaks;
    specTemp.encoding.color.scale.range = info.color_scheme;

    this.setState({
      //vegaLiteSpec: specTemp,
      rawScript: JSON.stringify(specTemp, null, 4)
    });
    
  };

  // When click the "Run Script" btn
  handleScriptRunClick = () => {
    // store the old spec string for the last step
    this.state.vegaLiteSpec.data.values = this.state.selectRawCase;
    this.setState({
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
      vegaLiteSpec: rawObj,
      specOld: rawObj,
      specOldText: JSON.stringify(rawObj, null, 4)
    });
  };

  getMeasures = (breaks) => {
    // make request options
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          class_breaks: breaks,
          data_list: this.state.selectedCaseData.features.data_list,
          case_name: this.state.selectRawCase,
          key_prop: this.state.selectedCaseData.features.key_prop
      })
    };
    fetch('http://127.0.0.1:5000/getfeature', requestOptions)
        .then(response => response.json())
        .then(json => {
            const responseMsg = json.msg;
            const measures = json.measures;
            
            console.log(measures);
          })
          .catch(error => {
            console.log(error);
          });

    //return requestOptions;
    
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
      mapFeature['k'] = spec.encoding.color.scale.range.length;
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
    //this.getMeasures(spec.encoding.color.scale.domain);

    // return extracted map features
    return mapFeature;
  }; 

  /** Render components for the main layout */
  render(){
    const { Content } = Layout;
    //console.log(this.state);
    /** Hard rule check for the spec properties */
    let spec = this.state.vegaLiteSpec;
    let {hardRuleViolation, hasHardRuleViolation} = this.checkMapHardRule(spec);
    //console.log(hardRuleViolation);
    //console.log(hasHardRuleViolation);
    let hardErrFlag = (this.state.hasHardRuleViolation || hasHardRuleViolation) ? true : false; 
    let hardErrMsg = this.state.hardRuleMsg.concat(hardRuleViolation);

    //TODO: Soft rule check
    let mapFeatureReady = null;
    let recommend_k = null;
    let recommend_color = null;
    let originVegaSpec = null;
    if(!hardErrFlag){
      /** record the original map spec with deceptive designs */
      originVegaSpec = JSON.parse(JSON.stringify(spec));
      /** extract map features */
      mapFeatureReady = this.extractMapFeatures(spec);
      // determine color scheme and k for the recommend charts
      recommend_k = (mapFeatureReady.k >= 3 && mapFeatureReady.k <= 7) ? mapFeatureReady.k : 3;
      recommend_color = (mapFeatureReady.k >= 3 && mapFeatureReady.k <= 7) ? mapFeatureReady.color_scheme : ['#5dc963', '#21918d', '#3b528b'];
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
                      specOldText={this.state.specOldText}
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

              {/** Middle Col */}
              <Col span={8}>
                <Row gutter={[6,6]}>
                  {/** 1st Row at the middle column - show original map */}
                  <Col span={24}>
                    <MapLinter
                      vegaLiteSpec={this.state.specOld}
                      selectRawCase={this.state.selectRawCase}
                      selectedCaseData={this.state.selectedCaseData}
                      onVegaParseError={this.handleVegaParseError}
                      hasHardRuleViolation={hardErrFlag}
                    />
                  </Col>
                  {/** Linter Report */}
                  <Col span={24}>
                    <LinterReport
                      originalGVF={this.state.originalGVF[this.state.selectRawCase]}
                      originalMoran={this.state.originalMoran[this.state.selectRawCase]}
                      hasHardRuleViolation={hardErrFlag}
                      hardRuleMsg={hardErrMsg}
                      onHardRuleFixClick={this.handleHardRuleFixClick}
                      mapFeatureReady={mapFeatureReady}
                      selectedCaseData={this.state.selectedCaseData}
                      selectRawCase={this.state.selectRawCase}
                      currentMapFeature={this.currentMapFeature}
                      colorList={this.state.colorList}
                      onSoftFix={this.handleSoftFix}
                      onMapProjChange={this.handleMapProjChange}
                    />
                  </Col>
                </Row>
              </Col>

              {/** Right Col */}
              <Col span={9}>
                <Row gutter={[6,6]}>
                  <Col span={24}>
                    <SupportMapView 
                      selectRawCase={this.state.selectRawCase}
                      selectedCaseData={this.state.selectedCaseData}
                      vegaLiteSpec={this.state.vegaLiteSpec}
                      softFixSpec={this.state.softFixSpec}
                      hasHardRuleViolation={hardErrFlag}
                      selectProjType={this.state.selectProjType}
                    />
                  </Col>
                  <Col span={24}>
                    <ClassRecommend
                      hasHardRuleViolation={hardErrFlag}
                      selectRawCase={this.state.selectRawCase}
                      selectedCaseData={this.state.selectedCaseData}
                      vegaLiteSpec={this.state.vegaLiteSpec}
                      classificationMeasureList={this.state.classificationMeasureList}
                      onClassificationPreviewClick={this.handldClassificationPreviewClick}
                      recommend_k={recommend_k}
                      recommend_color={recommend_color}
                      colorList={this.state.colorList}
                      color_scheme_name={this.state.color_scheme_name}
                      onCurrentKChange={this.handleCurrentKChange}
                      onCurrentColorChange={this.handleCurrentColorChange}
                      onCurrentMeasuresChange={this.handleCurrentMeasuresChange}
                    />
                    
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
