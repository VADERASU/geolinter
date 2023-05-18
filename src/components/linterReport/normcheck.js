import React, {useEffect, useState} from "react";
import {Card, Typography, Space, Divider, Select, Upload, Button, Row, Col, Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import "../../styles/LinterReport.css"

export function Normcheck(props){
    const { Text, Title } = Typography;

    const handleClick = () => {
        props.onCaseSelection("state_shipment_norm");
    };

    return(
        <Card
            title={"Normalization Check"}
            size='small'
            className={"softRuleCard"}
        >
            <div style={{padding: 8}}>
                <Space direction="vertical">
                <Title level={5}>Please check the data normalization before generating the map.</Title>
                
                <div>
                    <Text><b>Option 1</b>. Select a properity from the dataset:</Text>
                    <Select 
                        size="small"
                        defaultValue="population"
                        style={{marginLeft: 10}}
                        options={[
                            {value: 'population', label: 'population'},
                            {value: 'shipment', label: 'shipment'},
                        ]}
                    />
                </div>

                <div>
                    <Text><b>Option 2</b>. Upload a new dataset with the property you want to normalize with:</Text>
                    <br/><Text italic>(Please use the same primary key (e.g. state name, id, or FIPS) with the map data to map the geographic locations)</Text>
                    <br/>
                    <Row style={{marginTop: 5}}>
                        <Col span={6}>
                        <Upload>
                            <Button size="small" icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        </Col>
                        <Col span={7}>
                        <Text>The primary key:</Text>
                        <Select 
                            size="small"
                            defaultValue="id"
                            style={{marginLeft: 10}}
                            options={[
                                {value: 'population', label: 'population'},
                                {value: 'id', label: 'id'},
                            ]}
                        />
                        </Col>
                        <Col span={11}>
                        <Text>Be normalized with:</Text>
                        <Select 
                            size="small"
                            defaultValue="population"
                            style={{marginLeft: 10}}
                            options={[
                                {value: 'population', label: 'population'},
                                {value: 'id', label: 'id'},
                            ]}
                        />
                        </Col>
                    </Row>    
                </div>
                </Space>
                
                <Divider />
                <Text strong>Enter the data units after normalization:</Text>
                <Input placeholder="e.g. per catipa, or percent (%)" />

                <Space wrap style={{marginLeft: 80, marginTop: 20}}>
                    <Button type="primary" onClick={handleClick}>Normalize the Data</Button>
                    <Button>Skip, Data has already been normalized</Button>
                </Space>
            </div>

        </Card>
    );
}