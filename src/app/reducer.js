import { ACTIONS } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER: return { ...state, user: action.payload };
        case ACTIONS.SET_TOKEN: return { ...state, token: action.payload };
        case ACTIONS.SET_SERVER_ERROR: return { ...state, SERVER_ERROR: action.payload };
        default: return state

    }
}