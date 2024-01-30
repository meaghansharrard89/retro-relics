import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";

function Shop( { user, setUser } ) {
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById("shop");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  return (
    <>
      <div id="shop">
        <h1>Shop</h1>
      </div>
    </>
  );
}

export default Shop;
