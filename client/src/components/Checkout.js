import React from "react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  // Access location to get user's name
  const location = useLocation();
  const { username, orderDetails } = location.state;

  return (
    <>
      <h2>Thanks for placing your order, {username}!</h2>
      <p>Your order summary:</p>
      {/* Add order summary content here */}
    </>
  );
}
