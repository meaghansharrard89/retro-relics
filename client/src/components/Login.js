import { useState } from "react";
import { useUser } from "./UserContext";

export default function Login() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("userID", user.id);
        setUser(user);
      } else {
      }
    } catch (error) {}
    console.log("I was submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
