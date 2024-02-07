import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setOrdersLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setUser(editedUser);
        setIsEditing(false);
        console.log("User updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("There was a problem with the update:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleDeleteClick = () => {
    const email = window.prompt("Please enter your email:");
    const password = window.prompt("Please enter your password:");
    if (email !== null && password !== null) {
      verifyEmailPasswordAndDeleteProfile(email, password);
    }
  };

  const verifyEmailPasswordAndDeleteProfile = async (email, password) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        if (data.error === "Invalid credentials") {
          window.alert("Incorrect email or password. Please try again.");
        } else {
          throw new Error("Account deletion failed");
        }
      } else {
        window.alert("Account deleted successfully");
        setUser(null);
        history.push("/");
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      window.alert("Error during account deletion. Please try again later.");
    }
  };

  return (
    <>
      <h2>Edit Profile Information</h2>
      <p>
        First name:{" "}
        {isEditing ? (
          <input
            type="text"
            name="firstname"
            value={editedUser.firstname}
            onChange={handleChange}
          />
        ) : (
          user?.firstname || ""
        )}
      </p>
      <p>
        Last name:{" "}
        {isEditing ? (
          <input
            type="text"
            name="lastname"
            value={editedUser.lastname}
            onChange={handleChange}
          />
        ) : (
          user?.lastname || ""
        )}
      </p>
      <p>
        Address:{" "}
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={editedUser.address}
            onChange={handleChange}
          />
        ) : (
          user?.address || ""
        )}
      </p>
      <p>
        City:{" "}
        {isEditing ? (
          <input
            type="text"
            name="city"
            value={editedUser.city}
            onChange={handleChange}
          />
        ) : (
          user?.city || ""
        )}
      </p>
      <p>
        State:{" "}
        {isEditing ? (
          <input
            type="text"
            name="state"
            value={editedUser.state}
            onChange={handleChange}
          />
        ) : (
          user?.state || ""
        )}
      </p>
      <p>
        Zip:{" "}
        {isEditing ? (
          <input
            type="text"
            name="zip"
            value={editedUser.zip}
            onChange={handleChange}
          />
        ) : (
          user?.zip || ""
        )}
      </p>

      {isEditing ? (
        <>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>Edit</button>
          <br />
          <button onClick={handleDeleteClick}>Delete Profile</button>
        </>
      )}
      <h2>Previous Orders:</h2>
      {orders.map((order) => (
        <div key={order.order_id}>
          <p>Ordered on: {order.created_at}</p>
          <p>Details:</p>
          <ul>
            {order.order_details.map((detail) => (
              <li key={detail.item_id}>
                Item(s): {detail.item_name}, Price: {detail.item_price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
