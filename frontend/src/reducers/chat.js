import {
  defineActions,
  HTTP,
} from "../utils/redux";
import * as api from "../utils/api";


const ACTIONS = defineActions('chat', ['LOAD_REQUEST', 'LOAD_SUCCESS', 'LOAD_FAILURE', 'POST_MESSAGE']);

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
    case ACTIONS.POST_MESSAGE:
      const chat = {
        ...state.chat, messages: [
          ...state.chat.messages, { user: 'placeholder', message: action.message }
        ]
      }
      return { ...state, chat }
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

export const postMessage = (message, chatId) => async dispatch => {
  try {
    const response = await api.post(`chat/${chatId}/message`, { message });
    dispatch({ type: ACTIONS.POST_MESSAGE, message });
  } catch (err) {
    dispatch({ type: ACTIONS.LOAD_FAILURE, error: "Something went wrong." });
  }
}