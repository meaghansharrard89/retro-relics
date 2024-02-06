import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CuratorFeed from "../components/CuratorFeed";

function Social() {
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
    </>
  );
}

export default Social;
