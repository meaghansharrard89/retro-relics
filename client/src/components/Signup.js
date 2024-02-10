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
          errorData.error.includes("Email already exists")
        ) {
          setError({
            title: "Error",
            message:
              "This email already exists. Please choose a different email.",
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

  return (
    <>
      <section class="text-gray-600 body-font h-screen flex items-center justify-center">
        <div class="container px-5 py-24 mx-auto lg:w-2/6 xl:w-2/5 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col lg:ml-auto w-full">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5 text-center">
            New user? Sign Up.
          </h2>
          <div class="relative mb-4">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="text"
              name="text"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="full-name" class="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-600">
                State
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-600">
                Zip Code
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <button class="text-white bg-dark-accent border-0 py-2 px-8 focus:outline-none hover:bg-dark-accent-light rounded text-lg">
            Submit
          </button>
          {/* </div> */}
        </div>
      </section>
      {/* EXISTING FORM */}
      {/* <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>Email:</label>
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>Address:</label>
        <input
          type="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: e.target.value,
            })
          }
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>City:</label>
        <input
          type="city"
          value={formData.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.target.value,
            })
          }
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>State:</label>
        <input
          type="city"
          value={formData.state}
          onChange={(e) =>
            setFormData({
              ...formData,
              state: e.target.value,
            })
          }
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>Zip Code:</label>
        <input
          type="zip"
          value={formData.zip}
          onChange={(e) =>
            setFormData({
              ...formData,
              zip: e.target.value,
            })
          }
          required
        />
        <br />
        <label style={{ marginTop: "15px" }}>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form> */}
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
