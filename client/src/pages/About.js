import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useChat } from "../components/ChatContext";
import Chatbot from "../components/Chatbot";

function About() {
  const location = useLocation();
  const { isVisible } = useChat();

  useEffect(() => {
    const el = document.getElementById("about");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  // useEffect(() => {
  //   document.body.style.backgroundImage =
  //     "url('https://i.ibb.co/3Yv5h9s/revisedbackground.png')"; // Replace 'path/to/your/image.jpg' with the path to your background image
  //   document.body.style.backgroundRepeat = "repeat"; // Make the background image repeat

  //   return () => {
  //     document.body.style.backgroundImage = null;
  //     document.body.style.backgroundRepeat = null;
  //   };
  // }, []);

  return (
    <div
      id="about"
      className="flex justify-center items-center py-8 px-4 mx-auto max-w-6xl mt-14"
    >
      {/* Text and image container */}
      <div className="relative flex items-center">
        {/* Image */}
        <img
          src="https://i.ibb.co/C5NXhkB/yellowblob.png"
          alt="blob"
          className="absolute rounded-full w-130 h-auto"
          style={{ zIndex: -1, left: "50%", transform: "translateX(-50%)" }}
        />
        {/* Text */}
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-10">
            Welcome to Retro Revival! Where thrift meets fashion.
          </h1>
          <p className="mb-7 text-lg">
            At Retro Revival, we don't just sell vintage goods - we cherish the
            memories they hold, celebrate their timeless style, and honor the
            uniqueness of each piece. As a small business owner, I invite you to
            explore my carefully curated collection, where every item has a
            story to tell and adds a touch of history to your home.
          </p>
          <p className="mb-7 text-lg">
            Whether you're an experienced thrift shopper or new to the world of
            vintage fashion, let Retro Revival ignite your love for all things
            retro!
          </p>
        </div>
      </div>
      {isVisible && <Chatbot />}
    </div>
  );
}

export default About;
