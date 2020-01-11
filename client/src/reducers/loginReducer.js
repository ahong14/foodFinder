import actions from '../actions/actions';

const initialState = {
    login: false,
    email: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.LOGIN_SUCCESS:
            return{
                ...state,
                login: true,
                email: action.email
            }
        case actions.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default reducer;