import React from "react";

function ErrorModal({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="mt-4 flex justify-center cursor-pointer">
          <button className="btn btn-red" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
