import React, { Component } from 'react';
import { Form, Col, Row, Input, Select } from 'antd';
import  PicturesWall from "./profile-pic";

const { Option } = Select;

export default class CreatePerson extends Component {

    formRef = React.createRef();

    get person() {
        const newPerson = {...this.formRef.current.getFieldValue()};
        this.formRef.current.resetFields();
        return newPerson;
    }

    get valid() {
        const {name, email} = this.formRef.current.getFieldValue();
        return !!name && !!email;
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    render() {
        debugger
        // this.formRef
        return (
            <> 
            <Form ref={this.formRef} layout="vertical" hideRequiredMark>
                <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                
                  rules={[{ required: true, message: 'Please enter person name' }]}
                >
                  <Input placeholder="Please enter person name" />
                </Form.Item>
              </Col>
            </Row>
                <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter person age' }]}
                >
                  <Input placeholder="Please enter person age" />
                </Form.Item>
              </Col>
            
            </Row>
            <Row>
                <Col span={12}>
                <Form.Item
                  name="profile"
                  label="Profile"
                  rules={[{ required: true, message: 'Please enter person age' }]}
                >
                    <PicturesWall></PicturesWall>
                    </Form.Item>
                </Col>
            </Row>
            </Form>
            </>
        );
    }
    
}