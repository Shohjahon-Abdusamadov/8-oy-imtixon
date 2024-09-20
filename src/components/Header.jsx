import React, { useState, useEffect } from "react";
import Logo from "../assets/CRYPTOFOLIO.svg";
import { Link } from "react-router-dom";
import { useCrypto } from "../context/CryptoContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const { currency, setCurrency } = useCrypto();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // useEffect to update favorites when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(updatedFavorites);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleRemove = (cryptoId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== cryptoId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex items-center justify-between max-w-[1280px] m-auto py-4">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <div className="flex gap-4 items-center">
        <select
          onChange={(e) => setCurrency(e.target.value)}
          className="select select-ghost"
        >
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>
        <div className="text-center">
          <button
            onClick={toggleDrawer}
            className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#87CEEB] dark:hover:bg-blue-400 focus:outline-none dark:focus:ring-blue-800 p-0"
            type="button"
          >
            Watch List
          </button>

          <div
            className={`w-[511px] fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-labelledby="drawer-right-label"
          >
            <button
              type="button"
              onClick={toggleDrawer}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            <h2 className="font-montserrat text-lg font-bold mb-4 text-center text-white">
              Watch List
            </h2>

            {favorites.length === 0 ? (
              <p className="text-center text-white">No favorites yet.</p>
            ) : (
              <div className="space-y-4 flex gap-4 flex-wrap">
                {favorites.map((crypto) => (
                  <div
                    key={crypto.id}
                    className="bg-[#14161A] p-4 rounded-lg w-[198px]"
                    style={{ margin: "0" }}
                  >
                    <div className="flex items-center flex-col m-0">
                      <img
                        width="118"
                        height="118"
                        src={crypto.image}
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <h3 className="text-black font-bold">{crypto.name}</h3>
                        <p className="text-gray-500">
                          {crypto.current_price} USD
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(crypto.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
