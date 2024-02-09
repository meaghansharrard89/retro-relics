import { useEffect } from "react";
import Gif from "../images/GIF2.gif";

function Home() {
  useEffect(() => {
    // Apply background image to body
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3Yv5h9s/revisedbackground.png')"; // Replace 'path/to/your/image.jpg' with the path to your background image
    document.body.style.backgroundRepeat = "repeat"; // Make the background image repeat

    // Clean up when component unmounts
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundRepeat = null;
    };
  }, []);

  return (
    <>
      <div
        id="home"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          source
          src={Gif}
          type="video/mp4"
          style={{ width: "50%", height: "80%" }}
        />
      </div>
    </>
  );
}

export default Home;
