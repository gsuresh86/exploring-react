import React, { Component } from "react";
import {DeleteTwoTone } from "@ant-design/icons";
import { Card } from 'antd';

const { Meta } = Card;

class Person extends Component {

    deletePerson = (index) => {
        alert(this.state);
    }

    render() {
        return (
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="no profile" src={this.props.picture} />}
                onClick={this.props.editClick}
            >
                <Meta title={this.props.name} description={this.props.email} />
                <DeleteTwoTone style={{ fontSize: '16px', color: '#08c' }} onClick={this.props.deleteClick} />
            </Card>
        );
    }   
}
export default Person;