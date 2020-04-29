import {
  defineActions,
  HTTP,
} from "../utils/redux";
import * as api from "../utils/api";


const ACTIONS = defineActions('chats', ['LOAD_REQUEST', 'LOAD_SUCCESS', 'LOAD_FAILURE']);

const initialState = {
  ...HTTP.INIT,
  chats: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_REQUEST:
      return { ...state, ...HTTP.REQUEST };
    case ACTIONS.LOAD_SUCCESS:
      return { ...state, ...HTTP.SUCCESS, chats: action.chats };
    case ACTIONS.LOAD_FAILURE:
      return { ...state, ...HTTP.FAILURE, error: action.error };
    default:
      return state;
  }
};


export const loadChats = () => async dispatch => {
  console.log('debug loadChats')
  dispatch({ type: ACTIONS.LOAD_REQUEST });
  try {
    const chats = await api.getJSON('chats');
    dispatch({ type: ACTIONS.LOAD_SUCCESS, chats });
  } catch (err) {
    dispatch({ type: ACTIONS.LOAD_FAILURE, error: "Something went wrong." });
  }
}