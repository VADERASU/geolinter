import React, {Component} from "react";
import { Typography, Card } from 'antd';

class ListRow extends Component{
    
    render(){
        const { Text } = Typography;

        return(
            <Card>
                <Text strong>Example</Text>
            </Card>
        );
    }
}
export default ListRow;