import React, {Component} from "react";
import '../../styles/MapLinter.css';
import { Image } from 'antd';

class MainMapHistogram extends Component {
    render(){
        return(
            <div>
                <Image
                    width={550}
                    src={require('../../resource/demoHist.png')}
                    preview={false}
                />
            </div>
        );
    }
}
export default MainMapHistogram;