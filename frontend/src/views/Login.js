import React, { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { setUser as setUserAction } from "../reducers/auth"

const Login = () => {
    const [user, setUser] = useState('');
    const dispatch = useDispatch()
    const handleSubmit = useCallback(evt => {
        evt.preventDefault()
        dispatch(setUserAction(user))
        dispatch(push('/chats'))
    }, [user])
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-10 question-list">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username-input">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username-input"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
