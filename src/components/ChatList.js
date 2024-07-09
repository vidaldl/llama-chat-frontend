import React from 'react';
import { Link } from 'react-router-dom';

const ChatList = ({ chats }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <Link key={chat._id} to={`/chat/${chat._id}`} className="chat-link">
          Chat {chat._id}
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
