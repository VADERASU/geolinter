import React from 'react';
import {Select, Card} from 'antd';
import '../../styles/NavBar.css';

//const {Option} = Select;

class NavBar extends React.Component{

    render(){
        //console.log(this.props);
        const {Option} = Select;

        return(

            <Card
                size='small'
                className='navBarDetail'
                style={{height: 40}}
            >
                <span className="logo" href="#">Choropleth Map Linter</span>
                <span className='label'>Select a case:</span>
                <Select
                    onChange={this.props.onCaseSelection}
                    size={'small'}
                    defaultValue={this.props.mapDataList[0]}
                    style={{
                        width: 180,
                        float: 'left',
                        marginTop: '3px',
                        marginRight: '24px'
                    }}
                >
                    {this.props.mapDataList.map((casename) => 
                        <Option key={casename.toString()} value={casename.toString()}>{casename}</Option>
                    )}
                </Select>
            </Card>
        );
    }
}

export default NavBar;