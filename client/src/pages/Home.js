import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";

function Home( { user, setUser } ) {
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById("home");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  //   const history = useHistory();

  //   useEffect(() => {
  //     const handleScroll = () => {
  //   const homeSection = document.getElementById("home");
  //   const homeSectionOffset = homeSection.offsetTop;

  //   if (window.scrollY >= homeSectionOffset) {
  //     history.replace(`${location.pathname}#home`);
  //   }
  // };

  // window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, [location.pathname, history]);

  return (
    <>
      <div id="home">
        <h1>Retro Relics</h1>
      </div>
    </>
  );
}

export default Home;
