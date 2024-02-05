import { useEffect, useState } from "react";
import Chatbot from "../components/Chatbot";

function Shop() {
  const [items, setItems] = useState([]);

  const handleClick = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.alert("Added to cart!");
  };

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isSoldOut: item.inStock === false,
      }))
    );
  }, []);

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
            <button onClick={() => handleClick(item)} disabled={!item.inStock}>
              {!item.inStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      <Chatbot />
    </>
  );
}

export default Shop;
