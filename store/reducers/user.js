import * as actionTypes from '../types';
const initialState = {
    userData: null,
    userDataLoaded:false
}; //Initial state of the counter

const reducer = (state = {}, action) => {
    switch (action.type) {

        case actionTypes.LOGIN_USER:
            return {
                ...state,
                userData:action.payload
            };

        case actionTypes.LOGIN_USER:
            return {
                userData:null,
                ...state
            };

        case actionTypes.DATA_LOADED:
            return {...state,userDataLoaded:true};

        default: return state;
    }
};

export default reducer;