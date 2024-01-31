import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Checkout() {
  // Access location to get user's name
  const location = useLocation();
  const { username, orderDetails } = location.state;

  return (
    <>
      <h2>Congrats on your order, {username}!</h2>
      <NavLink to="/shop">Continue Shopping</NavLink>
    </>
  );
}
