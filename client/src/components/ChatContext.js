import React, { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Load chat messages from localStorage on component mount
    const storedChatMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setChatMessages(storedChatMessages);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const addMessage = (message) => {
    const newMessages = [...chatMessages, message];
    setChatMessages(newMessages);
    localStorage.setItem("chatMessages", JSON.stringify(newMessages));
  };

  return (
    <ChatContext.Provider
      value={{ isVisible, toggleVisibility, chatMessages, addMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
