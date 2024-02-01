import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";
import { useOrder } from "../components/OrderContext";

function Shop({ user, setUser, updateCartCount }) {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const { orderDetails } = useOrder();

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

  const handleClick = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart.length);
  };

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  useEffect(() => {
    if (orderDetails && orderDetails.length > 0) {
      console.log("Order Details:", orderDetails);
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) => {
          const isItemInOrder = orderDetails.some(
            (orderItem) => orderItem.item_id === item.id
          );
          console.log(
            `Item ${item.name} is ${
              isItemInOrder ? "in the order" : "not in the order"
            }`
          );
          return {
            ...item,
            isSoldOut: isItemInOrder,
          };
        });
        console.log("Updated Items:", updatedItems);
        return updatedItems; // This line remains unchanged
      });
    }
  }, [orderDetails]);

  // useEffect(() => {
  //   const el = document.getElementById("shop");
  //   el &&
  //     window.scrollTo({
  //       behavior: "smooth",
  //       top: el.offsetTop,
  //     });
  // }, [location]);

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
            <button onClick={() => handleClick(item)} disabled={item.inStock}>
              {item.inStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Shop;
