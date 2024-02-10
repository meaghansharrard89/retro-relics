import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useOrder } from "../components/OrderContext";
import { useUser } from "../components/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorModal from "../components/ErrorModal";
import CartItems from "../components/CartItems";

function Cart({
  cartItems,
  setCartItems,
  handleDeleteFromCart,
  calculateTotal,
}) {
  const location = useLocation();
  const { user, setUser } = useUser();
  const { setCompletedOrder } = useOrder();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [name]: value,
    }));
  };

  const isBillingInfoComplete = () => {
    const { cardName, cardNumber, expirationDate, cvv } = billingInfo;
    const isCardNumberValid = /^\d{16}$/.test(cardNumber);
    const isExpirationDateValid = /^\d{2}\/\d{2}$/.test(expirationDate);
    const isCvvValid = /^\d{3,4}$/.test(cvv);

    return (
      cardName !== "" &&
      isCardNumberValid &&
      isExpirationDateValid &&
      isCvvValid
    );
  };

  const handleCheckout = async (e) => {
    try {
      if (cartItems.length === 0) {
        setError({
          title: "Error",
          message: "Cannot checkout with an empty cart",
        });
        return;
      }
      const orderDetails = cartItems.map((item) => ({
        item_id: item.id,
      }));
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_details: orderDetails,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setCompletedOrder(orderDetails);
      localStorage.removeItem("cart");
      history.push("/checkout", { username: user.firstname });
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      setError({ title: "Error", message: `Error: ${error.message}` });
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [location]);

  return (
    <div>
      <CartItems
        cartItems={cartItems}
        handleDeleteFromCart={handleDeleteFromCart}
        calculateTotal={calculateTotal}
      />
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
          <button onClick={handleCheckout} disabled={!isBillingInfoComplete()}>
            Confirm order
          </button>
        </div>
      ) : (
        <div class="forms-container">
          <br />
          <br />
          <Login user={user} setUser={setUser} />
          <br />
          <br />
          <Signup user={user} setUser={setUser} />
        </div>
      )}
      {/* Error modal */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}

export default Cart;
