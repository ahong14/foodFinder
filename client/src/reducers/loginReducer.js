import actions from '../actions/actions';

const initialState = {
    login: false,
    email: '',
    savedItems: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                login: true,
                email: action.email,
                savedItems: [...action.items]
            }
        case actions.UPDATE_SAVED_ITEMS:
            return {
                ...state,
                savedItems: [...action.items]
            }
        case actions.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default reducer;