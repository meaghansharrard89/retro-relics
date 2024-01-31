import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useLocation, useHistory } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Checkout from "../components/Checkout";

function Cart({ user, setUser, cartCount, updateCartCount }) {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();
  const [billingInfo, setBillingInfo] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(""); // Add error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [name]: value,
    }));
  };

  const isBillingInfoComplete = () => {
    const { cardName, cardNumber, expirationDate, cvv } = billingInfo;
    return (
      cardName !== "" &&
      cardNumber !== "" &&
      expirationDate !== "" &&
      cvv !== ""
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        // Remove dollar sign and convert the string to a float
        const itemPrice = parseFloat(item.price.replace("$", ""));
        return total + itemPrice;
      }, 0)
      .toFixed(2);
  };

  const handleDeleteFromCart = (index) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    currentCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCartItems(currentCart);
    // updateCartCount(cartCount.length);
  };

  const handleCheckout = async (e) => {
    try {
      if (cartItems.length === 0) {
        // Alert the user or provide some feedback that the cart is empty
        window.alert("Cannot checkout with an empty cart.");
        return;
      }

      if (!isBillingInfoComplete()) {
        window.alert(
          "Please fill out all billing information before confirming the order."
        );
        return;
      }

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

      localStorage.removeItem("cart");
      history.push("/checkout", { username: user.firstname });
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      window.alert(`Error: ${error.message}`);
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
        <p>Total: ${calculateTotal()}</p>
        {/*Logged in or new user*/}
        {user && user.email ? (
          <div>
            <h2>Welcome, {user.firstname}!</h2>
            <p>Enter your billing information to complete your order:</p>
            <form>
              <label>
                Name on Card:
                <input
                  type="text"
                  name="cardName"
                  value={billingInfo.cardName}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={billingInfo.cardNumber}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Expiration Date:
                <input
                  type="text"
                  name="expirationDate"
                  value={billingInfo.expirationDate}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={billingInfo.cvv}
                  onChange={handleChange}
                />
              </label>
            </form>
            <button
              onClick={handleCheckout}
              disabled={!isBillingInfoComplete()}
            >
              Confirm order
            </button>
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
