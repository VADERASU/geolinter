import React from 'react';
import {Select, Slider, Cascader, Card} from 'antd';
import '../../styles/NavBar.css';

//const {Option} = Select;

class NavBar extends React.Component{

    render(){
        //console.log(this.props);

        return(

            <Card
                size='small'
                className='navBarDetail'
                style={{height: 40}}
            >
                <span className="logo" href="#">Choropleth Map Linter</span>
            </Card>
        );
    }
}

export default NavBar;