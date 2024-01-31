import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar({ cartCount }) {
  const linkStyle = {
    color: "white",
    backgroundColor: "#A8672A",
    borderRadius: "10px",
    padding: "10px",
    textDecoration: "none",
    margin: "5px",
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
        Cart <span>{cartCount}</span>
      </NavLink>
    </>
  );
}

export default NavBar;
