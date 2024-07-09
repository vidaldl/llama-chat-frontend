import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import axios from 'axios';
import './style.css';

const App = () => {
  const [chats, setChats] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/chats`);
        console.log('Fetched chats:', response.data); // Debugging log
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error); // Debugging log
        setChats([]); // Ensure chats is always an array
      }
    };
    fetchChats();
  }, [apiUrl]);

  const createChat = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/create-chat`);
      console.log('Created chat:', response.data); // Debugging log
      setChats([...chats, response.data]);
    } catch (error) {
      console.error('Error creating chat:', error); // Debugging log
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`${apiUrl}/api/chat/${chatId}`);
      setChats(chats.filter(chat => chat._id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error); // Debugging log
    }
  };

  return (
    <Router>
      <div className="app">
        <Sidebar chats={chats} createChat={createChat} deleteChat={deleteChat} />
        <Routes>
          <Route path="/chat/:id" element={<ChatWindow />} />
          <Route path="/" exact element={
            <div className="container">
              <h1>Welcome to Llama Chat</h1>
              <p>Select a chat or start a new one from the sidebar.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
