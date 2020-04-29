import React from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import Login from "./views/Login";
import Chats from "./views/Chats";
import CreateChat from "./views/CreateChat";
import Chat from "./views/Chat";
import NotFound from "./views/NotFound";

const AuthenticatedRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  if (!user) {
    dispatch(replace('/login'));
    return 'redirecting...'
  }
  return (
    <Switch>
      <Route exact path="/chats" component={Chats} />
      <Route exact path="/chat/create" component={CreateChat} />
      <Route exact path="/chat/:id" component={Chat} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}


const App = () => {
  return (
    <div>
      <header>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={AuthenticatedRoutes} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
