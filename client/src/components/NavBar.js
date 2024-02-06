import { NavLink } from "react-router-dom";
import { useChat } from "../components/ChatContext";
import Chatbot from "../components/Chatbot";
import { useUser } from "./UserContext";

function NavBar() {
  const { isVisible, toggleVisibility } = useChat();
  const { user, setUser } = useUser();
  const linkStyle = {
    color: "white",
    backgroundColor: "#A8672A",
    borderRadius: "10px",
    padding: "10px",
    textDecoration: "none",
    margin: "5px",
  };

  const handleClick = async (event) => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.removeItem("userID");
        setUser(null);
      } else {
      }
    } catch (error) {}
  };

  return (
    <div id="navbar">
      <NavLink to="/" style={linkStyle}>
        HOME
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        ABOUT
      </NavLink>
      <NavLink to="/shop" style={linkStyle}>
        SHOP
      </NavLink>
      <NavLink to="/social" style={linkStyle}>
        SOCIAL
      </NavLink>
      <NavLink to="/cart" style={linkStyle}>
        CART
      </NavLink>
      {user && user.email ? (
        <>
          <NavLink to="/profile" style={linkStyle}>
            PROFILE
          </NavLink>
          <NavLink to="/" style={linkStyle} onClick={handleClick}>
            LOGOUT
          </NavLink>
        </>
      ) : (
        ""
      )}
      <button onClick={toggleVisibility}>
        {isVisible ? "End Chat" : "Start Chat"}
      </button>{" "}
      {isVisible && <Chatbot />}
    </div>
  );
}

export default NavBar;
