import React from "react";

function Footer() {
  return (
    <>
      <footer class="bg-accent text-center text-neutral-600 dark:bg-accent-light dark:text-neutral-200 lg:text-left">
        <div class="mx-2 md:mx-6 py-2 md:py-0">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div class="mb-4 md:mb-0">
              <h6 class="mb-2 font-semibold uppercase text-dark-accent">
                Useful links
              </h6>
              <p class="mb-2">
                <a href="#!" class="text-dark-accent dark:text-neutral-200">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" class="text-dark-accent dark:text-neutral-200">
                  Help
                </a>
              </p>
            </div>
            <div class="mb-4 md:mb-0">
              <h6 class="mb-2 font-semibold uppercase text-dark-accent">
                Contact
              </h6>
              <p class="mb-2 flex items-center justify-center md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="mr-2 h-5 w-5"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                info@example.com
              </p>
            </div>
            <div class="mb-4 md:mb-0">
              <h6 class="mb-2 font-semibold uppercase text-dark-accent">
                © 2023 Copyright:
              </h6>
              <p
                class="mb-2 flex items-center justify-center md:justify-start"
                href="https://tw-elements.com/"
              >
                Retro Revival
              </p>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>{`
        footer {
          width: 100%;
          background-color: #f5f5f5; /* Adjust the background color as needed */
          padding: 20px 0; /* Adjust the padding as needed */
        }
        /* Sticky footer CSS */
        body {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}

export default Footer;
