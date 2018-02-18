import _ from 'lodash';

var defaultState = {
    userData : []
};
export default (state=defaultState, action) => {
    var newSate;
    switch(action.type){
        case 'ADD_USER':
            newSate = {
                ...state,
                userData : [...state.userData, action.userInfo]
            }
            break;
        case 'REMOVE_USER':
            break;
        case 'STORE_RESPONSE':
            break;
        case 'SET_ACTIVE':
            _.each(state.userData, function(anUser, index){
                if(anUser.uniqueId == action.uniqueId)
                    anUser.selected = true;
                else
                    anUser.selected = false;
            });
            // newSate = state;  //does not work
            
            // newSate = { //also this not worked
            //     ...state,
            // }
            
            newSate = {
                ...state,
                userData : [...state.userData]
            }
            break;

        case 'ON_CHANGE':
            _.each(state.userData, function(anUser, index){
                if(anUser.uniqueId == action.options.uniqueId)
                    anUser[action.options.field] = action.options.value;                
            });
            newSate = {
                ...state,
                userData : [...state.userData]
            }
            break;
        default:
            newSate = state;
    }
    return newSate;
}