import React from "react";
import { useUser } from "./UserContext";

export default function CartItems({
  cartItems,
  handleDeleteFromCart,
  calculateTotal,
}) {
  const { user } = useUser();

  return (
    <>
      <br />
      <h1 class="text-center mb-6 text-2xl font-bold h-full">Your Cart:</h1>
      {cartItems.map((cartItem, index) => (
        <div
          key={index}
          class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
        >
          <div class="rounded-lg md:w-2/3">
            <div class="justify-between mb-6 rounded-lg bg-accent-lightest p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={cartItem.image_url}
                alt={cartItem.imageAlt}
                class="w-full rounded-lg sm:w-40"
              />
              <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                  <h2 class="text-lg font-bold text-gray-900">
                    {cartItem.name}
                  </h2>
                  <p class="mt-1 text-s text-gray-700">
                    {cartItem.description}
                  </p>
                </div>
                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div class="flex items-center border-gray-100">
                    <span class="rounded-r bg-gray-100 py-1 px-3 duration-100">
                      {cartItem.price}
                    </span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={handleDeleteFromCart}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div class="mx-auto mt-6 h-full rounded-lg border bg-accent-lightest p-6 shadow-md md:mt-0 md:w-1/3 justify-center">
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              $ {calculateTotal()}
            </p>
          </div>
        </div>
        {user && user.email ? (
          <p class="mt-6 text-red-500 text-center">
            Enter your billing details to make a purchase.
          </p>
        ) : (
          <p class="mt-6 text-red-500 text-center">
            Please sign in or sign up to make a purchase.
          </p>
        )}
      </div>
    </>
  );
}
