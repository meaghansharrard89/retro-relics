import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import { useChat } from "../components/ChatContext";

function Home() {
  const location = useLocation();
  const { isVisible, toggleVisibility } = useChat();

  return (
    <>
      <div id="home">
        <img
          src="https://i.ibb.co/qsxyBYp/Retro-Revival.png"
          alt="Retro-Revival"
          style={{ maxWidth: "100%" }}
        />
        <br />
        <button onClick={toggleVisibility}>Open Chat</button>
        {isVisible && <Chatbot />}
      </div>
    </>
  );
}

export default Home;
