import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";

export default function CheckoutModal({ isOpen }) {
  const location = useLocation();

  return (
    <>
      <Transition
        show={isOpen}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Congrats on your order!
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Get excited for some thrifted goodies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <NavLink
                    to="/profile"
                    type="button"
                    className="cursor-pointer inline-flex w-full justify-center rounded-md bg-dark-accent hover:bg-dark-accent-light px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                  >
                    Go to Profile
                  </NavLink>
                  <NavLink
                    to="/shop"
                    type="button"
                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-dark-accent hover:bg-dark-accent-light px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                  >
                    Continue Shopping
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
