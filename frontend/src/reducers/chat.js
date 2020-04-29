import {
  defineActions,
  HTTP,
} from "../utils/redux";
import * as api from "../utils/api";


const ACTIONS = defineActions('chat', ['LOAD_REQUEST', 'LOAD_SUCCESS', 'LOAD_FAILURE']);

const initialState = {
  ...HTTP.INIT,
  chat: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_REQUEST:
      return { ...state, ...HTTP.REQUEST };
    case ACTIONS.LOAD_SUCCESS:
      return { ...state, ...HTTP.SUCCESS, chat: action.chat };
    case ACTIONS.LOAD_FAILURE:
      return { ...state, ...HTTP.FAILURE, error: action.error };
    default:
      return state;
  }
};


export const loadChat = (chatId) => async dispatch => {
  dispatch({ type: ACTIONS.LOAD_REQUEST });
  try {
    const chat = await api.getJSON(`chat/${chatId}`);
    dispatch({ type: ACTIONS.LOAD_SUCCESS, chat });
  } catch (err) {
    dispatch({ type: ACTIONS.LOAD_FAILURE, error: "Something went wrong." });
  }
}