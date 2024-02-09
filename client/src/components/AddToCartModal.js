import React from "react";

function AddToCartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div class="fixed inset-0 z-10 flex items-center justify-center">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {/* Modal header */}
            <div class="sm:flex sm:items-start">
              {/* Close button */}
              <button
                onClick={onClose}
                class="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              ></button>
              {/* Modal title and content */}
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                  Added to cart!
                </h3>
                <div class="mt-2"></div>
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onClose}
              class="inline-flex w-full justify-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent sm:ml-3 sm:w-auto"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
