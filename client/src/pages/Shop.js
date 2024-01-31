import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";

function Shop({ user, setUser }) {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemList = {
    listStyle: "none",
    padding: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items);
        // setLoading(false);
      });
    // .catch((err) => {
    //   setError(err);
    //   setLoading(false);
    // });
  }, []);

  useEffect(() => {
    const el = document.getElementById("shop");
    el &&
      window.scrollTo({
        behavior: "smooth",
        top: el.offsetTop,
      });
  }, [location]);

  return (
    <>
      <div id="shop">
        <h1>Shop</h1>
        {items.map((item) => (
          <div
            key={item.id}
            style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
            <img src={item.image_url} alt={item.imageAlt} width="200px" />
            <br />
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Shop;
