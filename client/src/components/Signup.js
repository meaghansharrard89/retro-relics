import { useState } from "react";
// import Container from "@mui/material/Container";
// import { Link } from "react-router-dom";

export default function Signup({ user, setUser }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("userID", user.id); // Store user ID in local storage
        // Redirect to the appropriate page or display a success message
        setUser(user);
      } else {
        // Handle signup error (e.g., display error message)
      }
    } catch (error) {
      // Handle network errors
    }
    // set user, navigate to new page - use setUser as props
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        // type="email"
        value={formData.firstname}
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
        required
      />
      <br />
      <label>Last Name:</label>
      <input
        // type="email"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        required
      />
      <br />
      <label style={{ marginTop: "15px" }}>Email:</label>
      <input
        // type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <br />
      <label style={{ marginTop: "15px" }}>Address:</label>
      <input
        type="address"
        value={formData.address}
        onChange={(e) =>
          setFormData({
            ...formData,
            address: e.target.value,
          })
        }
        required
      />
      <br />
      <label style={{ marginTop: "15px" }}>City:</label>
      <input
        type="city"
        value={formData.city}
        onChange={(e) =>
          setFormData({
            ...formData,
            city: e.target.value,
          })
        }
        required
      />
      <br />
      <label style={{ marginTop: "15px" }}>State:</label>
      <input
        type="city"
        value={formData.state}
        onChange={(e) =>
          setFormData({
            ...formData,
            state: e.target.value,
          })
        }
        required
      />
      <br />
      <label style={{ marginTop: "15px" }}>Zip Code:</label>
      <input
        type="zip"
        value={formData.zip}
        onChange={(e) =>
          setFormData({
            ...formData,
            zip: e.target.value,
          })
        }
        required
      />
      <br />
      <label style={{ marginTop: "15px" }}>Password:</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
        required
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
