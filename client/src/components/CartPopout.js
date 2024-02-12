import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

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
    <Transition
      show={isOpen}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {(ref) => (
        <div
          ref={ref}
          className="fixed inset-0 overflow-hidden"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
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
                            <li key={index} className="flex py-6 mb-20">
                              <div className="flex flex-col">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {cartItem.name}
                                </h3>
                                <p className="text-gray-500">
                                  {cartItem.price}
                                </p>
                                <br />
                                <p className="text-gray-500">
                                  {cartItem.description}
                                </p>
                                <br />
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

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mb-40">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${calculateTotal()}</p>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-center text-center">
                        <button
                          onClick={continueShopping}
                          className="mr-4 bg-dark-accent px-6 py-3 text-base font-medium text-white rounded-md shadow-sm hover:bg-dark-accent-light"
                        >
                          Continue Shopping
                        </button>
                        <button
                          onClick={goToCheckout}
                          className="bg-dark-accent px-6 py-3 text-base font-medium text-white rounded-md shadow-sm hover:bg-dark-accent-light"
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
      )}
    </Transition>
  );
}

export default CartPopout;
