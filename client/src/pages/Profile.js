import React from "react";
import { useLocation } from "react-router-dom";

export default function Profile({ user, setUser }) {
  return (
    <>
      <h2>This page will have user information and allow the user to edit</h2>
      <p>First name: {user.firstname}</p>
      <p>Last name: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>State: {user.state}</p>
      <p>Zip: {user.zip}</p>
    </>
  );
}
