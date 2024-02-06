import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function About() {
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
        <p>
          Welcome to Retro Revival, your ultimate destination for all things
          vintage and nostalgic! At Retro Revival, we're more than just a thrift
          reseller - we're curators of memories, purveyors of style, and
          champions of individuality.
        </p>
        <p>
          Whether you're a seasoned thrift shopper or a newcomer to the world of
          vintage fashion, Retro Revival welcomes you with open arms. Join us on
          a journey through the decades, where every item tells a story and
          every purchase brings a little piece of history into your home.
        </p>
        <p>
          So why wait? Come on in, browse to your heart's content, and let Retro
          Revival ignite your passion for all things retro!
        </p>
      </div>
    </>
  );
}

export default About;
