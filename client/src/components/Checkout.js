import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const { username } = location.state;

  return (
    <>
      <h2>Congrats on your order, {username}!</h2>
      <NavLink to="/shop">Continue Shopping</NavLink>
      <br />
      <NavLink to="/profile">Navigate to your Profile</NavLink>
    </>
  );
}
