import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function DeleteModal({
  verifyEmailPasswordAndDeleteProfile,
  history,
  isOpen,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const handleDelete = async () => {
    if (email.trim() === "" || password.trim() === "") {
      window.alert("Please enter both email and password.");
      return;
    }
    await verifyEmailPasswordAndDeleteProfile(email, password, history);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative z-10 bg-white rounded-lg border border-gray-300 p-6 max-w-md w-full">
            <div className="text-center">
              <h3
                className="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                Delete Account
              </h3>
              <br />
              <p className="text-sm text-gray-500">
                Please enter your email and password to confirm deletion.
              </p>
              <br />
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-2"
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 px-3 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-2"
                placeholder="Password"
              />
            </div>
            <br />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="cursor-pointer inline-flex justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              >
                Delete Account
              </button>
              <NavLink
                to="/profile"
                className="cursor-pointer inline-flex justify-center rounded-md bg-dark-accent hover:bg-dark-accent-light px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
              >
                Cancel
              </NavLink>
            </div>
          </div>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
        </div>
      )}
    </>
  );
}
