import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CuratorFeed from "../components/CuratorFeed";
import Chatbot from "../components/Chatbot";
import { useChat } from "../components/ChatContext";

function Social() {
  const location = useLocation();
  const { isVisible, toggleVisibility } = useChat();

  useEffect(() => {
    const el = document.getElementById("social");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  return (
    <>
      <div id="social">
        <h1>Check out our Instagram!</h1>
        <CuratorFeed />
      </div>
      <button onClick={toggleVisibility}>Open Chat</button>
      {isVisible && <Chatbot />}
    </>
  );
}

export default Social;
