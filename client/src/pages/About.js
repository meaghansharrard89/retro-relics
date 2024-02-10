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
      class="flex justify-between items-center py-8 px-4 mx-auto max-w-6xl mt-14"
    >
      {/* Text column */}
      <div class="relative" style={{}}>
        <div class="max-w-md mr-8">
          <img
            src="https://i.ibb.co/BfbtBrV/lighterblob.png"
            alt="blob"
            class="rounded-full w-120 h-auto"
            style={{ position: "absolute", zIndex: -1 }}
          />
          <h1 class="text-3xl font-bold mb-10">
            Welcome to Retro Revival! Where thrift meets fashion.
          </h1>
          <p class="mb-7 text-1xl">
            Welcome to Retro Revival, your ultimate destination for all things
            vintage and nostalgic! My name is Meaghan, and here at Retro
            Revival, we're more than just a thrift reseller - we're curators of
            memories, purveyors of style, and champions of individuality.
          </p>
          <p class="mb-7 text-1xl">
            Whether you're a seasoned thrift shopper or a newcomer to the world
            of vintage fashion, Retro Revival welcomes you with open arms. Join
            us on a journey through the decades, where every item tells a story
            and every purchase brings a little piece of history into your home.
          </p>
          <p class="mb-7 text-1xl">
            So why wait? Come on in, browse to your heart's content, and let
            Retro Revival ignite your passion for all things retro!
          </p>
        </div>
      </div>
      {/* Image column */}
      <div class="relative" style={{ width: "550px" }}>
        <img
          src="https://i.ibb.co/FWJxDxj/editedheadshot.jpg"
          alt="headshot"
          class="rounded-full w-80 h-auto left-20"
          style={{ position: "relative", zIndex: 0 }}
        />
        <img
          src="https://i.ibb.co/7KjwB1h/aboutoutline.png"
          alt="outline"
          class="absolute top-0 right-8"
          style={{ width: "100%", height: "auto", zIndex: 1, top: "-40px" }}
        />
      </div>
      {isVisible && <Chatbot />}
    </div>
  );
}

export default About;
