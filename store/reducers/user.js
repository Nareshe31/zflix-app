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

        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                userData:null,
            };

        case actionTypes.DATA_LOADED:
            return {...state,userDataLoaded:true};

        case actionTypes.UPDATE_WATCHLIST:
            return {...state,userData:{...state.userData,watchlist:[...action.payload]}};

        default: return state;
    }
};

export default reducer;