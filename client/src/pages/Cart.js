import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";

function Cart({ user, setUser }) {
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById("cart");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  return (
    <>
      <div id="cart">
        <h1>Shopping Cart</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      ></div>
      <div className="forms-container">
        <div className="form-section existing-user">
          <h2>Have an existing account? Log in:</h2>
          <br />
          <Login user={user} setUser={setUser} />
        </div>
        <div className="form-section new-user">
          <h2>New here? Create an account:</h2>
          <br />
          <Signup user={user} setUser={setUser} />
        </div>
      </div>
    </>
  );
}

export default Cart;
