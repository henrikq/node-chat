import { defineActions } from "../utils/redux";
import * as api from "../utils/api";


const ACTIONS = defineActions('auth', ['SET_USER']);

const initialState = {
    user: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SET_USER:
            sessionStorage.setItem('user', action.user);
            return { ...state, user: action.user };
        default:
            return state;
    }
};


export const setUser = (user) => ({ type: ACTIONS.SET_USER, user });