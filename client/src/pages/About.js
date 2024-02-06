import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import { useChat } from "../components/ChatContext";

function About() {
  const location = useLocation();
  const { isVisible, toggleVisibility } = useChat();

  useEffect(() => {
    const el = document.getElementById("about");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  return (
    <>
      <div id="about">
        <h1>Welcome to Retro Revival! Where thrift meets fashion.</h1>
        <button onClick={toggleVisibility}>Open Chat</button>
        {isVisible && <Chatbot />}
      </div>
    </>
  );
}

export default About;
