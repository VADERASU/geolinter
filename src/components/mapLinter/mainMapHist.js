import React, {Component} from "react";
import '../../styles/MapLinter.css';
import * as d3 from 'd3';

class MainMapHistogram extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    drawHistogram = (data) => {
        const {scrollWidth, scrollHeight} = this.canvasRef.current;
    };

    clearCanvas = () => {
        const rootGroup = d3.select(this.canvasRef.current).select('g#root-group');
        rootGroup.selectAll('g').remove();
    };

    componentDidMount() {
        let data = this.props.selectedCaseData.features;
        if(data !== null) {

        }
    }

    componentDidUpdate() {
        this.clearCanvas();

    }

    render(){
        return(
            <div style={{height: 150}} ref={this.canvasRef}> {/** 235px in 1080p */}
                <svg
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <g id="root-group"/>
                </svg>
            </div>
        );
    }
}
export default MainMapHistogram;