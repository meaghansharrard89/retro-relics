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
        <h1 class="text-3xl font-bold mb-4 text-center mt-12">
          Check us out on Instagram at retro__revival__shop!
        </h1>
        <div
          class="flex justify-between items-center py-8 px-4 mx-auto max-w-6xl
        mt-14"
        >
          <CuratorFeed />
        </div>
      </div>
    </>
  );
}

export default Social;
