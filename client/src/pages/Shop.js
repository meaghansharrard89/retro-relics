import { useEffect, useState } from "react";
// import Chatbot from "../components/Chatbot";
// import { useChat } from "../components/ChatContext";

function Shop({ user, setUser }) {
  const [items, setItems] = useState([]);
  // const { isVisible, toggleVisibility } = useChat();
  const [filterStatus, setFilterStatus] = useState("");

  const handleClick = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.alert("Added to cart!");
  };

  useEffect(() => {
    fetch("/items_with_categories")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isSoldOut: !item.inStock,
      }))
    );
  }, []);

  const filteredItems = items.filter(
    (item) => !filterStatus || item.categories.includes(filterStatus)
  );

  return (
    <>
      <div id="shop">
        <br />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            width: "200px",
            marginBottom: 5,
            marginTop: "20px",
            borderColor: "gray",
            ":focus": { borderColor: "black" },
          }}
        >
          <option value="">All</option>
          <option value="Clothing">Clothing</option>
          <option value="Housewares">Housewares</option>
          <option value="Misc">Misc</option>
          {/* {filteredItems.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))} */}
        </select>
        <br />
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}
          >
            <img src={item.image_url} alt={item.imageAlt} width="200px" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
            <p>{item.categories}</p>
            <button onClick={() => handleClick(item)} disabled={!item.inStock}>
              {!item.inStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={toggleVisibility}>Open Chat</button>
      {isVisible && <Chatbot />} */}
    </>
  );
}

export default Shop;
