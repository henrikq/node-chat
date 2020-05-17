import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadChat, postMessage } from '../reducers/chat';
// import { useParams } from 'react-router-dom';


const useChat = (chatId) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.chat)
    const { pending, success, failure } = state;

    useEffect(() => {
        if (!pending && !success && !failure) dispatch(loadChat(chatId));
    }, [pending, success, failure, dispatch]);

    return state;
}

const Chat = () => {
    // need to upgrade react-router-dom to use userParams
    // const { id: chatId } = useParams();    
    const urlParts = document.location.href.split('/');
    const chatId = urlParts[urlParts.length - 1];
    const { chat, loading } = useChat(chatId);

    const dispatch = useDispatch();
    const [messageInput, setMessageInput] = useState('');
    const handleSubmit = evt => {
        evt.preventDefault()
        dispatch(postMessage(messageInput, chatId))
    }

    if (loading || !chat) return 'Loading...';
    console.log('debug Chat', { chat })
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-10 question-list">
                    <ol>
                        {chat.messages.map((message) => {
                            return (
                                <li key={message['_id']}>
                                    {`${message.user}: ${message.message}`}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-10 question-list">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="post-input">post</label>
                            <input
                                type="text"
                                className="form-control"
                                id="post-input"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Chat;
