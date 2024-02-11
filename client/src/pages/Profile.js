import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setOrdersLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setUser(editedUser);
        setIsEditing(false);
        console.log("User updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("There was a problem with the update:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleDeleteClick = () => {
    const email = window.prompt("Please enter your email:");
    const password = window.prompt("Please enter your password:");
    if (email !== null && password !== null) {
      verifyEmailPasswordAndDeleteProfile(email, password, history);
    }
  };

  const verifyEmailPasswordAndDeleteProfile = async (
    email,
    password,
    history
  ) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Invalid credentials") {
          window.alert("Incorrect email or password. Please try again.");
        } else {
          throw new Error("Account deletion failed");
        }
      } else {
        window.alert("Account deleted successfully");
        setUser(null);
        history.push("/");
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      window.alert("Error during account deletion. Please try again later.");
    }
  };

  return (
    <>
      <form>
        <div class="space-y-12">
          <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Profile
          </h1>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last-name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="street-address"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label
              for="city"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              State
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="region"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Zip Code
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
          <button
            type="submit"
            class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          <button
            type="submit"
            class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        </div>
      </form>

      <div class="flex justify-start item-start space-y-2 flex-col">
        <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Previous Orders:
        </h1>
        <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
          21st Mart 2021 at 10:34 PM
        </p>
      </div>
      <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>
            <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div class="pb-4 md:pb-8 w-full md:w-40">
                <img
                  class="w-full hidden md:block"
                  src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                  alt="dress"
                />
                <img
                  class="w-full md:hidden"
                  src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                  alt="dress"
                />
              </div>
              <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div class="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                    Premium Quaility Dress
                  </h3>
                  <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-sm dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Style:{" "}
                      </span>{" "}
                      Italic Minimal Design
                    </p>
                    <p class="text-sm dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Size:{" "}
                      </span>{" "}
                      Small
                    </p>
                    <p class="text-sm dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Color:{" "}
                      </span>{" "}
                      Light Blue
                    </p>
                  </div>
                </div>
                <div class="flex justify-between space-x-8 items-start w-full">
                  <p class="text-base dark:text-white xl:text-lg leading-6">
                    $36.00{" "}
                    <span class="text-red-300 line-through"> $45.00</span>
                  </p>
                  <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                    01
                  </p>
                  <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                    $36.00
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
              <div class="w-full md:w-40">
                <img
                  class="w-full hidden md:block"
                  src="https://i.ibb.co/s6snNx0/Rectangle-17.png"
                  alt="dress"
                />
                <img
                  class="w-full md:hidden"
                  src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png"
                  alt="dress"
                />
              </div>
              <div class="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                <div class="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                    High Quaility Italic Dress
                  </h3>
                  <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-sm dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Style:{" "}
                      </span>{" "}
                      Italic Minimal Design
                    </p>
                    <p class="text-sm dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Size:{" "}
                      </span>{" "}
                      Small
                    </p>
                    <p class="text-sm dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Color:{" "}
                      </span>{" "}
                      Light Blue
                    </p>
                  </div>
                </div>
                <div class="flex justify-between space-x-8 items-start w-full">
                  <p class="text-base dark:text-white xl:text-lg leading-6">
                    $20.00{" "}
                    <span class="text-red-300 line-through"> $30.00</span>
                  </p>
                  <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                    01
                  </p>
                  <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                    $20.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div class="flex justify-between w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Subtotal
                  </p>
                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                    $56.00
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Discount{" "}
                    <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                      STUDENT
                    </span>
                  </p>
                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                    -$28.00 (50%)
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Shipping
                  </p>
                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                    $8.00
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center w-full">
                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  $36.00
                </p>
              </div>
            </div>
            <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div class="flex justify-between items-start w-full">
                <div class="flex justify-center items-center space-x-4">
                  <div class="w-8 h-8">
                    <img
                      class="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div class="flex flex-col justify-start items-center">
                    <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span class="font-normal">Delivery with 24 Hours</span>
                    </p>
                  </div>
                </div>
                <p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                  $8.00
                </p>
              </div>
              <div class="w-full flex justify-center items-center">
                <button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                  View Carrier Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div class="flex flex-col justify-start items-start flex-shrink-0">
              <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                  alt="avatar"
                />
                <div class="flex justify-start items-start flex-col space-y-2">
                  <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    David Kent
                  </p>
                  <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                    10 Previous Orders
                  </p>
                </div>
              </div>

              <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="cursor-pointer text-sm leading-5 ">
                  david89@gmail.com
                </p>
              </div>
            </div>
            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    180 North King Street, Northhampton MA 1060
                  </p>
                </div>
                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    180 North King Street, Northhampton MA 1060
                  </p>
                </div>
              </div>
              <div class="flex w-full justify-center items-center md:justify-start md:items-start">
                <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <h2>Edit Profile Information</h2>
      <p>
        First name:{" "}
        {isEditing ? (
          <input
            type="text"
            name="firstname"
            value={editedUser.firstname}
            onChange={handleChange}
          />
        ) : (
          user?.firstname || ""
        )}
      </p>
      <p>
        Last name:{" "}
        {isEditing ? (
          <input
            type="text"
            name="lastname"
            value={editedUser.lastname}
            onChange={handleChange}
          />
        ) : (
          user?.lastname || ""
        )}
      </p>
      <p>
        Address:{" "}
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={editedUser.address}
            onChange={handleChange}
          />
        ) : (
          user?.address || ""
        )}
      </p>
      <p>
        City:{" "}
        {isEditing ? (
          <input
            type="text"
            name="city"
            value={editedUser.city}
            onChange={handleChange}
          />
        ) : (
          user?.city || ""
        )}
      </p>
      <p>
        State:{" "}
        {isEditing ? (
          <input
            type="text"
            name="state"
            value={editedUser.state}
            onChange={handleChange}
          />
        ) : (
          user?.state || ""
        )}
      </p>
      <p>
        Zip:{" "}
        {isEditing ? (
          <input
            type="text"
            name="zip"
            value={editedUser.zip}
            onChange={handleChange}
          />
        ) : (
          user?.zip || ""
        )}
      </p>

      {isEditing ? (
        <>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>Edit</button>
          <br />
          <button onClick={handleDeleteClick}>Delete Profile</button>
        </>
      )}
      <h2>Previous Orders:</h2>
      {orders.map((order) => (
        <div key={order.order_id}>
          <p>Ordered on: {order.created_at}</p>
          <p>Details:</p>
          <ul>
            {order.order_details.map((detail) => (
              <li key={detail.item_id}>
                Item(s): {detail.item_name}, Price: {detail.item_price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
