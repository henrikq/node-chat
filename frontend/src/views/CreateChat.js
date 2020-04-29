import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import * as api from "../utils/api";

const CreateChat = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await api.post('chat/create', { to, message });
        const chatId = await response.json();
        console.log('debug handleSubmit', { response, chatId })
        dispatch(push(`/chat/${chatId}`));
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-10 question-list">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="to-input">Recipient Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="to-input"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                            <label htmlFor="message-input">Message</label>
                            <input
                                type="text"
                                className="form-control"
                                id="message-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateChat;
