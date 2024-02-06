import { useEffect, useState } from "react";
import Chatbot from "../components/Chatbot";
import { useChat } from "../components/ChatContext";

function Shop() {
  const [items, setItems] = useState([]);
  const { isVisible, toggleVisibility } = useChat();

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
        {items.map((item) => (
          <div
            key={item.id}
            style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}
          >
            <img src={item.image_url} alt={item.imageAlt} width="200px" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>Price: {item.price}</p>
            <br />
            <button onClick={() => handleClick(item)} disabled={!item.inStock}>
              {!item.inStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      <button onClick={toggleVisibility}>Open Chat</button>
      {isVisible && <Chatbot />}
    </>
  );
}

export default Shop;
