import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Checkout from "../components/Checkout";

function Cart({ user, setUser }) {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleDeleteFromCart = (index) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    currentCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCartItems(currentCart);
  };

  const handleCheckout = async (e) => {
    try {
      const orderDetails = cartItems.map((item) => ({
        item_id: item.id,
      }));

      const response = await fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          order_details: orderDetails,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error("Network response was not ok.");
      }

      console.log("Order placed successfully!");
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    // const el = document.getElementById("cart");
    // el &&
    //   window.scrollTo({
    //     behavior: "smooth",
    //     top: el.offsetTop,
    //   });

    // Load cart items from local storage when the Cart component mounts
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [location]);

  return (
    <>
      <div id="cart">
        <h1>Shopping Cart</h1>
        <h3>Your Items:</h3>
        {cartItems.map((cartItem, index) => (
          <div
            key={index}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <h3>{cartItem.name}</h3>
            <p>Price: {cartItem.price}</p>
            <p>{cartItem.description}</p>
            <img
              src={cartItem.image_url}
              alt={cartItem.imageAlt}
              width="200px"
            />
            <p>Quantity: 1</p>
            <button onClick={() => handleDeleteFromCart(index)}>
              Delete from Cart
            </button>
          </div>
        ))}
        {user && user.email ? (
          <div>
            <h2>Welcome, {user.firstname}!</h2>
            <p>Complete your order:</p>
            <p>Total: ${calculateTotal()}</p>
            {/* Add your order completion content here */}
            <button onClick={handleCheckout}>Checkout</button>
            <p>Past orders:</p>
          </div>
        ) : (
          <div className="forms-container">
            <div className="form-section existing-user">
              <h2>Have an existing account? Log in:</h2>
              <br />
              <Login user={user} setUser={setUser} />
            </div>
            <div className="form-section new-user">
              <h2>New here? Create an account:</h2>
              <br />
              <Signup user={user} setUser={setUser} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
