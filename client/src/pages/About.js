import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";

function About( { user, setUser } ) {
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
        <h1>Welcome to Retro Relics! Where thrift meets fashion.</h1>
      </div>
    </>
  );
}

export default About;
