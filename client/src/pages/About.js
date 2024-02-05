import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import Chatbot from "../components/Chatbot";

function About({ user, setUser }) {
  const location = useLocation();

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
        <Chatbot />
      </div>
    </>
  );
}

export default About;
