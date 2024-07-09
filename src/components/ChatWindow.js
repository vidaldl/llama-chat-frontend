import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const { id } = useParams(); // Use useParams to get the id
  const [chat, setChat] = useState(null);
  const [typing, setTyping] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  useEffect(() => {
    const fetchChat = async () => {
      const response = await axios.get(`${apiUrl}/api/chat/${id}`);
      setChat(response.data);
    };
    fetchChat();
  }, [id, apiUrl]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]); // Scroll to the bottom whenever the chat state updates

  useEffect(() => {
    if (messageQueue.length > 0 && !typing) {
      setTyping(true);
      const nextMessage = messageQueue[0];
      setTimeout(() => {
        setChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, nextMessage],
        }));
        setMessageQueue((prevQueue) => prevQueue.slice(1));
        setTyping(false);
      }, 500);
    }
  }, [messageQueue, typing]);

  const sendMessage = async (message) => {
    const response = await axios.post(`${apiUrl}/api/chat/${id}`, {
      message: message,
    });
    setMessageQueue(response.data.messages.slice(chat.messages.length));
  };

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Chat</h1>
      <div className="chat-container" ref={chatContainerRef}> {/* Attach the ref to the chat container */}
        {chat.messages.map((message, index) => (
          <div key={index} className={`message-container ${message.role}`}>
            <div className={`message ${message.role}`}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="message-container assistant">
            <div className="message assistant">
              <p>...</p>
            </div>
          </div>
        )}
      </div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
