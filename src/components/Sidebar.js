import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ chats, createChat, deleteChat }) => {
  console.log('Sidebar chats:', chats); // Debugging log

  if (!Array.isArray(chats)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <button onClick={createChat} className="new-chat-button">
        Start New Chat
      </button>
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat._id} className="chat-item">
            <Link to={`/chat/${chat._id}`} className="chat-link">
              Chat {chat._id}
            </Link>
            <button onClick={() => deleteChat(chat._id)} className="delete-button">×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
