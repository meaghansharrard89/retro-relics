import { useEffect, useState } from "react";

function Shop() {
  const [items, setItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  const handleClick = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.alert("Added to cart!");
  };

  useEffect(() => {
    fetch("/api/items_with_categories")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isSoldOut: !item.inStock,
      }))
    );
  }, []);

  const filteredItems = items.filter(
    (item) => !filterStatus || item.categories.includes(filterStatus)
  );

  return (
    <>
      <div class="relative inline-block text-center absolute left-1/2 -translate-x-1/2">
        <div
          class="z-10 mt-2 w-56 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <p className="px-4 py-2 text-sm text-gray-700">
              Filter by Category
            </p>
            <select
              className="block w-full px-4 py-2 text-sm text-gray-700"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setIsDropdownClicked(true);
              }}
            >
              <option value="">All</option>
              <option value="Clothing">Clothing</option>
              <option value="Housewares">Housewares</option>
              <option value="Misc">Misc</option>
            </select>
          </div>
        </div>
      </div>

      <br />

      <div id="shop" class="base">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredItems.map((item) => (
              <a href="#" class="group">
                <div key={item.id}>
                  <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={item.image_url}
                      alt={item.imageAlt}
                      class="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 class="mt-4 text-m text-black-700">{item.name}</h3>
                  <p class="mt-4 text-sm text-black-700">{item.description}</p>
                  <p class="mt-1 text-lg font-medium text-gray-900">
                    {item.price}
                  </p>
                  <br />
                  <div className="flex justify-center">
                    <button
                      class="bg-dark-accent mt-1 text-lg font-medium text-white rounded-md px-4 py-2"
                      onClick={() => handleClick(item)}
                      disabled={!item.inStock}
                    >
                      {!item.inStock ? "Sold Out" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
