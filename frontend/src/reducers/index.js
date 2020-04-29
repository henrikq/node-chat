import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import chat from "./chat";
import chats from "./chats";

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    chat,
    chats,
  });
