import React, { useEffect } from "react";

const CuratorFeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.charset = "UTF-8";
    script.src =
      "https://cdn.curator.io/published/11749c42-f0e7-47a7-a3dc-8d008d7c2164.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="curator-feed-default-feed-layout">
      <a
        href="https://curator.io"
        target="_blank"
        rel="noopener noreferrer"
        className="crt-logo crt-tag"
      >
        Powered by Curator.io
      </a>
    </div>
  );
};

export default CuratorFeed;
