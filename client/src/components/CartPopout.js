import React, { useState, useEffect } from "react";

function CartPopout({
  isOpen,
  onClose,
  continueShopping,
  goToCheckout,
  cartItems,
  setCartItems,
  handleDeleteFromCart,
}) {
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace("$", ""));
        return total + itemPrice;
      }, 0)
      .toFixed(2);
  };
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(existingCart);
  }, []);

  return (
    <div
      className={`relative z-10 ${isOpen ? "" : "hidden"}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cartItems.map((cartItem, index) => (
                          <li key={index} className="flex py-6">
                            <div className="flex flex-col">
                              <h3 className="text-lg font-medium text-gray-900">
                                {cartItem.name}
                              </h3>
                              <p className="text-gray-500">
                                Price: {cartItem.price}
                              </p>
                              <p className="text-gray-500">
                                Description: {cartItem.description}
                              </p>
                              <img
                                src={cartItem.image_url}
                                alt={cartItem.imageAlt}
                                className="w-24 h-24 object-cover"
                              />
                              <button
                                onClick={() => handleDeleteFromCart(index)}
                                className="mt-2 text-sm text-red-500"
                              >
                                Delete from Cart
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>${calculateTotal()}</p>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-center text-center">
                      <button
                        onClick={continueShopping}
                        className="mr-4 bg-accent-light px-6 py-3 text-base font-medium text-white rounded-md shadow-sm hover:bg-dark-accent-light"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={goToCheckout}
                        className="bg-accent-light px-6 py-3 text-base font-medium text-white rounded-md shadow-sm hover:bg-dark-accent-light"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPopout;
