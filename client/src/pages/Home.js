import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chatbot from "../components/Chatbot";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById("home");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  return (
    <>
      <div id="home">
        <img
          src="https://i.ibb.co/qsxyBYp/Retro-Revival.png"
          alt="Retro-Revival"
          style={{ maxWidth: "100%" }}
        />
        <Chatbot />
      </div>
    </>
  );
}

export default Home;
