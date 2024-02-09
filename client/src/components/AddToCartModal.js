import React from "react";

function AddToCartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div class="fixed inset-0 z-10 flex items-center justify-center">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          {/* Your modal content here */}
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {/* Modal header */}
            <div class="sm:flex sm:items-start">
              {/* Close button */}
              <button
                onClick={onClose}
                class="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {/* <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg> */}
              </button>
              {/* Modal content */}
              {/* <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"> */}
              {/* <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg> */}
              {/* </div> */}
              {/* Modal title and content */}
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                  Added to cart!
                </h3>
                <div class="mt-2">
                  {/* <p class="text-sm text-gray-500">Added to cart!</p> */}
                </div>
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
            {/* <button
              type="button"
              onClick={onClose}
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
