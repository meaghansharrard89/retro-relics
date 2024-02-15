import { useEffect } from "react";
// import Gif from "../images/GIF4.mp4";
// import GIF from "../images/GIF3.gif";

function Home() {
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
        class="mb-20"
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
