import { NavLink } from "react-router-dom";
import { useChat } from "../components/ChatContext";
import Chatbot from "../components/Chatbot";
import { useUser } from "./UserContext";
// import React from "react";

function NavBar() {
  const { isVisible, toggleVisibility } = useChat();
  const { user, setUser } = useUser();

  const handleClick = async (event) => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.removeItem("userID");
        setUser(null);
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <nav class="bg-dark-accent-light">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 rounded-full">
          <div class="relative flex h-16 items-center justify-between rounded-full">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden rounded-full">
              <button
                type="button"
                class="rounded-full relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="absolute -inset-0.5"></span>
                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="rounded-full flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* <div class="flex flex-shrink-0 items-center">
                <img
                  class="h-8 w-auto"
                  src="https://i.ibb.co/CJm7s8x/transparentyellowflower.png"
                  alt="Retro Revival"
                />
              </div> */}
              <div class="hidden sm:ml-6 sm:block rounded-full">
                <div class="flex space-x-4">
                  <a
                    href="/"
                    class="relative rounded-full outline-none hover:outline-accent-lightest text-accent-lightest px-3 py-2 text-sm font-medium"
                    activeClassName="outline-accent-lightest text-accent-lightest"
                    aria-current="page"
                  >
                    🌙 HOME
                  </a>
                  <a
                    href="/about"
                    class="outline-none hover:outline-accent-lightest text-accent-lightest relative rounded-full px-3 py-2 text-sm font-medium"
                    activeClassName="outline-accent-lightest text-accent-lightest"
                  >
                    🌼 ABOUT
                  </a>
                  <a
                    href="/social"
                    class="outline-none hover:outline-accent-lightest text-accent-lightest relative rounded-full px-3 py-2 text-sm font-medium"
                  >
                    ⭐️ SOCIAL
                  </a>
                  <a
                    href="/shop"
                    class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white relative rounded-full px-3 py-2 text-sm font-medium"
                  >
                    💗 SHOP
                  </a>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a
                href="/cart"
                class="outline-none hover:outline-accent-lightest relative rounded-full bg-dark-accent-light p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <img
                  src="https://i.ibb.co/W5swS2Y/shoppingbag.png"
                  alt="Shopping Bag Icon"
                  class="h-14 w-14"
                />
              </a>
              {user && user.email && (
                <>
                  <a
                    href="/profile"
                    class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white relative rounded-full px-3 py-2 text-sm font-medium"
                  >
                    PROFILE
                  </a>
                  <a
                    href="/"
                    onClick={handleClick}
                    class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white relative rounded-full px-3 py-2 text-sm font-medium"
                  >
                    LOGOUT
                  </a>
                </>
              )}
              <button
                onClick={toggleVisibility}
                class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white relative rounded-full px-3 py-2 text-sm font-medium"
              >
                {isVisible ? "End Chat" : "Start Chat"}
              </button>{" "}
              {isVisible && <Chatbot />}
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <a
              href="/"
              class="bg-dark-accent-light outline-none hover:outline-accent-lightest text-accent-lightest block relative rounded-full px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              HOME
            </a>
            <a
              href="/about"
              class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white block relative rounded-full px-3 py-2 text-base font-medium"
            >
              ABOUT
            </a>
            <a
              href="/social"
              class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white block relative rounded-full px-3 py-2 text-base font-medium"
            >
              SOCIAL
            </a>
            <a
              href="/shop"
              class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white block relative rounded-full px-3 py-2 text-base font-medium"
            >
              SHOP
            </a>
            <a
              href="/cart"
              class="outline-none hover:outline-accent-lightest relative rounded-full bg-dark-accent-light p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <img
                src="https://i.ibb.co/W5swS2Y/shoppingbag.png"
                alt="Shopping Bag Icon"
                class="h-14 w-14"
              />
            </a>
            {user && user.email && (
              <>
                <a
                  href="/profile"
                  class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white relative rounded-full px-3 py-2 text-sm font-medium"
                >
                  PROFILE
                </a>
                <a
                  href="/"
                  onClick={handleClick}
                  class="text-accent-lightest outline-none hover:outline-accent-lightest hover:text-white relative rounded-full px-3 py-2 text-sm font-medium"
                >
                  LOGOUT
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
