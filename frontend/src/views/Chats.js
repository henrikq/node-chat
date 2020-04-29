import React from "react";
import ChatList from "../components/ChatList";


const Chats = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-10 question-list">
          <ChatList />
        </div>
      </div>
    </div>
  );
}

export default Chats;
