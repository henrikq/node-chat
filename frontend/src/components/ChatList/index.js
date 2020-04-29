import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadChats } from '../../reducers/chats';

import './style.css';

const useChats = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.chats)
  const { pending, success, failure } = state;
  useEffect(() => {
    if (!pending && !success && !failure) dispatch(loadChats());
  }, [pending, success, failure, dispatch]);
  return state;
}

const ChatList = () => {
  const { chats, loading } = useChats();
  if (loading) return 'Loading...';
  return (
    <div>
      <Link className="btn btn-primary" to="/chat/create">
        new chat
      </Link>
      <ol>
        {chats && chats.map(chat => <ChatCard chat={chat} key={chat.id} />)}
      </ol>
    </div>

  );
}

const ChatCard = ({ chat }) => {
  return (
    <div className="chat-card">
      <Link to={`/chat/${chat.id}`}>
        <div className="chat-title">
          {chat.users.join(', ')}
        </div>
        <div className="chat-last-message">
          {`${chat.lastMessage.user}: ${chat.lastMessage.message}`}
        </div>
      </Link>
    </div>
  );
}

export default ChatList;
