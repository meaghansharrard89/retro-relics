import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";
import CuratorFeed from "../components/CuratorFeed";
import Chatbot from "../components/Chatbot";

function Social({ user, setUser }) {
  const location = useLocation();

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
      <Chatbot />
    </>
  );
}

export default Social;
