import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useHistory } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import ErrorModal from "../components/ErrorModal";

export default function Profile() {
  const history = useHistory();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    setShowDeleteModal(true);
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
        setError({
          title: "Success",
          message: "Account successfully deleted.",
        });
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
      <div class="fixed bg-accent-darkest rounded-lg border-base-200">
        <div class="border-base-200 p-6 max-w-lg mb-20">
          <form class="w-full" onSubmit={(e) => e.preventDefault()}>
            <div class="space-y-12">
              <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Profile
              </h1>
            </div>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <p
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name:{" "}
                </p>
                <div class="mt-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstname"
                      value={editedUser.firstname}
                      onChange={handleChange}
                      class="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p class="bg-white p-1.5 rounded-md">
                      {user?.firstname || ""}
                    </p>
                  )}
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
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastname"
                      value={editedUser.lasttname}
                      onChange={handleChange}
                      class="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p class="bg-white p-1.5 rounded-md">
                      {user?.lastname || ""}
                    </p>
                  )}
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
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address}
                      onChange={handleChange}
                      class="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p class="bg-white p-1.5 rounded-md">
                      {user?.address || ""}
                    </p>
                  )}
                </div>
              </div>

              <div class="col-span-full sm:col-span-3">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div class="mt-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={editedUser.city}
                      onChange={handleChange}
                      class="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p class="bg-white p-1.5 rounded-md">{user?.city || ""}</p>
                  )}
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
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={editedUser.state}
                      onChange={handleChange}
                      class="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p class="bg-white p-1.5 rounded-md">{user?.state || ""}</p>
                  )}
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
                  {isEditing ? (
                    <input
                      type="text"
                      name="zip"
                      value={editedUser.zip}
                      onChange={handleChange}
                      class="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p class="bg-white p-1.5 rounded-md">{user?.zip || ""}</p>
                  )}
                </div>
              </div>

              {isEditing ? (
                <>
                  <div class="sm:col-span-6 flex justify-left">
                    <button
                      onClick={handleSaveClick}
                      class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div class="sm:col-span-6 flex justify-left">
                    <button
                      onClick={handleEditClick}
                      class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      class="rounded-md bg-dark-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-dark-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <div class="flex justify-start items-start space-y-2 flex-col">
          <br />
          <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 mb-6">
            Previous Orders:
          </h1>
          <br />
          {orders.map((order) => (
            <div key={order.order_id} class="rounded-lg justify-center">
              <div class="rounded-lg mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 mb-6">
                <div class="justify-center rounded-lg flex flex-col justify-start items-start dark:bg-gray-800 bg-accent-lightest px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p class="text-base dark:text-black font-medium leading-6 text-black">
                    {order.created_at}
                  </p>
                  {order.order_details.map((detail) => (
                    <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div class="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {detail.item_name}
                          </h3>
                          <div class="flex justify-start items-start flex-col space-y-2">
                            <p class="text-sm dark:text-white leading-none text-gray-800">
                              {detail.item_description}
                            </p>
                            <br />
                            <img
                              class="text-sm dark:text-white leading-none text-gray-800"
                              src={detail.item_image}
                              style={{ width: "60px" }}
                            />
                          </div>
                        </div>
                        <div class="flex justify-between space-x-8 items-start w-full">
                          <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            {detail.item_price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          verifyEmailPasswordAndDeleteProfile={
            verifyEmailPasswordAndDeleteProfile
          }
          history={history}
          isOpen={showDeleteModal} // Add this line to pass the isOpen prop
        />
      )}
      {/* Error modal */}
      {error && (
        <ErrorModal
          title={error.title}
          isOpen={isModalOpen}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}
