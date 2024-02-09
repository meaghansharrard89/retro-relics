import { useState } from "react";
import { useUser } from "../components/UserContext";
import ErrorModal from "../components/ErrorModal";

export default function Signup() {
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateZip = (zip) => {
    return /^\d{5}$/.test(zip);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(formData.email)) {
      setError({
        title: "Error",
        message: "Invalid email address.",
      });
      return;
    }
    if (!validateZip(formData.zip)) {
      setError({
        title: "Error",
        message: "Invalid zip code.",
      });
      return;
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const user = await response.json();
        localStorage.setItem("userID", user.id);
        setUser(user);
      } else {
        const errorData = await response.json();
        if (
          errorData.error &&
          errorData.error.includes("Email already exists")
        ) {
          setError({
            title: "Error",
            message:
              "This email already exists. Please choose a different email.",
          });
        } else {
          setError({
            title: "Error",
            message: errorData.error,
          });
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError({
        title: "Error",
        message: `Error: ${error.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>Email:</label>
        <input
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
      {/* Error modal */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}
