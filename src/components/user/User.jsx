import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import UserListPanel from './userList/UserListPanel';
import UserViewPanel from './userView/UserViewPanel';

class User extends Component{
    constructor(props){
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.switchActiveUser = this.switchActiveUser.bind(this);
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        var that = this;
        axios.get('./users.json')
            .then(res => {
                var parsedResponse = that.parseResponse(res.data);
                _.each(parsedResponse, function(anUser, key){
                    that.props.addNewUser(anUser);
                });            
            });
    }
    parseResponse(response){
        _.each(response, function(val, index){
            val.uniqueId = index+1;
        });
        return response;
    }
    switchActiveUser(uniqueId){
        this.props.setActiveUser(uniqueId);
    }
    render(){
        console.log('================= Rendering User main container');
        return[
            <Row>
                <Col xs={3}>
                    <UserListPanel {...this.props} switchActiveUser={this.switchActiveUser}/>                    
                </Col>
                <Col xs={9}>
                    <UserViewPanel {...this.props}/>
                </Col>
            </Row>
        ];        
    }
};

const mapStateToProps = (state) => {
    return {
        userData    : state.userStore.userData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewUser: function(info){
            dispatch({type: 'ADD_USER', userInfo: info});
        },
        setActiveUser: function(uniqueId){
            dispatch({type: 'SET_ACTIVE', uniqueId: uniqueId});
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);