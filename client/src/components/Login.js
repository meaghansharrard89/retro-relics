import { useState } from "react";
import { useUser } from "./UserContext";

export default function Login() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("userID", user.id);
        setUser(user);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle fetch error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section class="flex items-center justify-center">
      <div class="container px-5 py-24   xl:w-2/5  bg-accent-lightest rounded-lg   flex-col ">
        <h2 class="text-gray-900 text-lg font-large title-font text-center">
          Existing user? Sign In!
        </h2>
        <form onSubmit={handleSubmit} class="mt-8 flex flex-col">
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="password" class="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
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
  );
}
