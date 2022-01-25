import React from 'react';
import {Select, Slider, Cascader} from 'antd';
import '../../styles/NavBar.css';

const {Option} = Select;

class NavBar extends React.Component{

    render(){
        //console.log(this.props);

        return(
            <div>
                <span className="logo" href="#">Choropleth Map Linter</span>

                {/** Scenario filters */}
                <span className="label">Import Scripts: </span>
               
                {/*<Select
                    size={'small'}
                    defaultValue='No Climate Data'
                    style={{
                        width: 120,
                        float: 'left',
                        marginTop: '8px',
                        marginRight: '24px'
                    }}
                >
                    {scenariosList.map((scenario) => 
                        <Option key={scenario.toString()} value={scenario.toString()}>{scenario}</Option>
                    )}
                    </Select>*/}
            </div>
        );
    }
}

export default NavBar;