import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useOrder } from "../components/OrderContext";
import { useUser } from "../components/UserContext";
import ErrorModal from "../components/ErrorModal";
import CartItems from "../components/CartItems";
import CheckoutModal from "../components/CheckoutModal";
import { Transition } from "@headlessui/react";

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
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
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
        setIsShowing((isShowing) => !isShowing);
        setError({
          title: "Error",
          message: "Cannot checkout with an empty cart.",
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
      setIsShowing((isShowing) => !isShowing);
      setShowCheckoutModal(true);
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
    <div className="flex flex-col min-h-screen pb-6">
      <div className="flex-grow overflow-y-auto">
        <CartItems
          cartItems={cartItems}
          handleDeleteFromCart={handleDeleteFromCart}
          calculateTotal={calculateTotal}
        />
        <br />
        {/*Logged in or new user*/}
        {user && user.email ? (
          <div className="flex flex-col items-center justify-center mx-auto mt-6 rounded-lg border bg-accent-lightest p-6 shadow-md md:w-1/3">
            <form className="flex flex-col items-center justify-center w-full">
              <p className="text-gray-800 font-medium mb-4">
                Billing Information:
              </p>
              <div className="leading-loose w-full max-h-60 overflow-y-auto">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cardName"
                >
                  Name on Card
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded mb-2"
                  id="cardName"
                  name="cardName"
                  type="text"
                  value={billingInfo.cardName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  aria-label="Name on Card"
                />
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded mb-2"
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  value={billingInfo.cardNumber}
                  onChange={handleChange}
                  placeholder="Card Number"
                  aria-label="Card Number"
                />
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="expirationDate"
                >
                  Expiration Date
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded mb-2"
                  id="expirationDate"
                  name="expirationDate"
                  type="text"
                  value={billingInfo.expirationDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  aria-label="Expiration Date"
                />
                <label className="block text-sm text-gray-600" htmlFor="cvv">
                  CVV
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded mb-4"
                  id="cvv"
                  name="cvv"
                  type="text"
                  value={billingInfo.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  aria-label="CVV"
                />
              </div>
              <button
                className="cursor-pointer mt-4 px-4 py-2 text-white font-light tracking-wider bg-dark-accent hover:bg-dark-accent-light rounded"
                type="button"
                onClick={handleCheckout}
                disabled={!isBillingInfoComplete()}
              >
                Confirm order
              </button>
            </form>
          </div>
        ) : (
          <>
            <div class="forms-container">
              <Login user={user} setUser={setUser} />
              <br />
              <Signup user={user} setUser={setUser} />
            </div>
            <br />
          </>
        )}
      </div>
      {/*Checkout Modal*/}
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {showCheckoutModal && (
          <CheckoutModal
            isOpen={showCheckoutModal}
            onClose={() => setShowCheckoutModal(false)}
            username={user.firstname}
          />
        )}
      </Transition>
      {/* Error modal */}
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onClose={() => setError(null)}
          />
        )}
      </Transition>
    </div>
  );
}

export default Cart;
