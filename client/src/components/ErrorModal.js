import React from "react";

function ErrorModal({ title, message, onClose }) {
  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto w-screen">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={onClose}
        ></div>
        <div className="relative bg-white rounded-lg p-8 max-w-md transition-all transform ease-in-out duration-300">
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
    </div>
  );
}

export default ErrorModal;
