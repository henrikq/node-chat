import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import thunk from "redux-thunk";
import { compact } from "lodash";
import { createRootReducer } from "./reducers/index";
import createBrowserHistory from "history/createBrowserHistory";
import App from "./App";

import "whatwg-fetch";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
const isProduction = process.env.NODE_ENV === "production";
const createReduxDevtools = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
  createRootReducer(history),
  compose(
    ...compact([
      applyMiddleware(routerMiddleware(history), thunk),
      !isProduction && createReduxDevtools()
    ])
  )
);

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
