import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './userList.css';

export default class UserListPanel extends Component{
    constructor(props){
        super(props);
        this.getMyDom           = this.getMyDom.bind(this);
    }

    getCardClassName(userDetail, e){
        var className = '';
        if(userDetail.selected)
            className = 'selected';
        return className;        
    }
    
    getMyDom(){
        var theDOM = ''; var self = this;
        if(this.props.userData.length > 0){
            theDOM = this.props.userData.map(function(anUserDetail, key){
                return (
                    <div key={key} className={self.getCardClassName(anUserDetail) + ' a-card'} onClick={( (e) => self.props.switchActiveUser(anUserDetail.uniqueId))}>
                        <p className='user-name text-left'>{anUserDetail.firstName} {anUserDetail.lastName}</p>
                    </div>
                )
            });
        }
        return theDOM;
    }

    render(){
        console.log("===============Rendering User List container.");
        var theDOM = this.getMyDom();
        return(
            <div className = 'col-xs-12 user-list-container'>
                {theDOM}
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         userData    : state.userStore.userData
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {        
//         setActiveUser: function(uniqueId){
//             dispatch({type: 'SET_ACTIVE', uniqueId: uniqueId});
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(UserListPanel);