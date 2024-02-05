import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
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
      const response = await fetch("/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.removeItem("userID");
        setUser(null);
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <>
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        About
      </NavLink>
      <NavLink to="/shop" style={linkStyle}>
        Shop
      </NavLink>
      <NavLink to="/social" style={linkStyle}>
        Social
      </NavLink>
      <NavLink to="/cart" style={linkStyle}>
        Cart
      </NavLink>
      {user && user.email ? (
        <>
          <NavLink to="/profile" style={linkStyle}>
            Profile
          </NavLink>
          <NavLink to="/" style={linkStyle} onClick={handleClick}>
            Logout
          </NavLink>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default NavBar;
