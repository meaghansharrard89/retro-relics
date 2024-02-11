import { useEffect } from "react";
import Gif from "../images/GIF4.mp4";
import GIF from "../images/GIF3.gif";

function Home() {
  // useEffect(() => {
  //   document.body.style.backgroundImage =
  //     "url('https://i.ibb.co/r6N8qjK/starbackground.png')"; // Replace 'path/to/your/image.jpg' with the path to your background image
  //   document.body.style.backgroundRepeat = "repeat"; // Make the background image repeat

  //   return () => {
  //     document.body.style.backgroundImage = null;
  //     document.body.style.backgroundRepeat = null;
  //   };
  // }, []);

  return (
    <>
      <div
        id="home"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
        class="mb-60"
      >
        <img
          source
          src="https://i.ibb.co/MPfHmt4/homelogo-2.png"
          alt="logo"
          style={{ maxWidth: "100%", height: "70vh", maxHeight: "80vh" }}
        />
        {/* <video
          autoPlay
          loop
          muted
          style={{ maxWidth: "100%", height: "70vh", maxHeight: "80vh" }}
        >
          <source src={Gif} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* <img
          src={GIF}
          alt="GIF"
          style={{ maxWidth: "100%", height: "70vh", maxHeight: "80vh" }}
        /> */}
      </div>
    </>
  );
}

export default Home;
