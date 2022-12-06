import { ACTIONS } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER: return { ...state, user: action.payload };
        default: return state

    }
}