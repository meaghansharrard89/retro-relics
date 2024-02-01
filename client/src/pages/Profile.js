import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  useEffect(() => {
    fetch("/orders")
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
      const response = await fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        // Update the local user state if the update is successful
        setUser(editedUser);
        setIsEditing(false);
        console.log("User updated successfully");
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("There was a problem with the update:", error);
    }
  };

  const handleCancelClick = () => {
    // Reset editedUser to original user data
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <>
      <h2>Edit profile information</h2>
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
        Email:{" "}
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
        ) : (
          user?.email || ""
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
        <button onClick={handleEditClick}>Edit</button>
      )}
      <h2>Previous orders:</h2>
      {orders.map((order) => (
        <div key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
          <p>Created At: {order.created_at}</p>
          <p>Order Details:</p>
          <ul>
            {order.order_details.map((detail) => (
              <li key={detail.item_id}>
                Item ID: {detail.item_id}, Item Name: {detail.item_name}
                {/* Include other details from OrderDetail and Item if needed */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
