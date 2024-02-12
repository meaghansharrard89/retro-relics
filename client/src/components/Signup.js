import { useState } from "react";
import { useUser } from "../components/UserContext";
import ErrorModal from "../components/ErrorModal";

export default function Signup() {
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateZip = (zip) => {
    return /^\d{5}$/.test(zip);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(formData.email)) {
      setError({
        title: "Error",
        message: "Invalid email address.",
      });
      return;
    }
    if (!validateZip(formData.zip)) {
      setError({
        title: "Error",
        message: "Invalid zip code.",
      });
      return;
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const user = await response.json();
        localStorage.setItem("userID", user.id);
        setUser(user);
      } else {
        const errorData = await response.json();
        if (
          errorData.error &&
          errorData.error.includes("Email already exists.")
        ) {
          setError({
            title: "Error",
            message:
              "This email already exists. Please choose a different email",
          });
        } else {
          setError({
            title: "Error",
            message: errorData.error,
          });
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError({
        title: "Error",
        message: `Error: ${error.message}`,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section class="text-gray-600 body-font flex items-center justify-center">
        <div class="container px-5 py-24 mx-auto lg:w-2/6 xl:w-2/5 md:w-2/3 bg-accent-lightest rounded-lg p-8 flex flex-col lg:ml-auto w-full">
          <h2 class="text-gray-900 text-lg font-large title-font mb-5 text-center">
            New user? Sign Up!
          </h2>
          <form onSubmit={handleSubmit} class="mt-8 flex flex-col">
            <div class="relative mb-4">
              <label for="firstname" class="leading-7 text-sm text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="lastname" class="leading-7 text-sm text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="address" class="leading-7 text-sm text-gray-600">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="city" class="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="state" class="leading-7 text-sm text-gray-600">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="zip" class="leading-7 text-sm text-gray-600">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              class="text-white bg-dark-accent border-0 py-2 px-8 focus:outline-none hover:bg-dark-accent-light rounded text-lg self-center"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
      <br />
      {/* Error modal */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}
