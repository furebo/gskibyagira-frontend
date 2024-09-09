import * as constants from '../Actions/types';
const initialState = {
    error:null,
    token:null,
    user:{}
}
export const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case constants.SET_AUTHENTICATION:
            return {
                ...state,
                user:action.user,
                token:action.token
            }
        case constants.SET_ERROR:
            return {
                ...state,
                error:action.payload,
            }
        default:
            return state
    }
}