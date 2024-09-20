import React, { useState, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";

const Hero = () => {
  const [cryptos, setCryptos] = useState([]);
  const { keyCrypto } = useCrypto();
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchCryptosFromLocalStorage = () => {
    const savedCryptos = JSON.parse(localStorage.getItem("favorites")) || [];
    return savedCryptos;
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  useEffect(() => {
    const savedCryptos = fetchCryptosFromLocalStorage();
    const groupedCryptos = chunkArray(savedCryptos, 4);
    setCryptos(groupedCryptos);

    const handleStorageChange = () => {
      const updatedCryptos = fetchCryptosFromLocalStorage();
      const updatedGroupedCryptos = chunkArray(updatedCryptos, 4);
      setCryptos(updatedGroupedCryptos);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cryptos.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [cryptos.length]);

  return (
    <div className="bg-[url('/heroImage.png')] w-full bg-no-repeat bg-cover">
      <div className="max-w-[1280px] m-auto pt-[55px]">
        <h1 className="font-montserrat text-[60px] font-bold leading-[72px] tracking-[-0.5px] text-center text-sky-300">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <div>
          <div id="crypto-carousel" className="relative w-full">
            <div className="relative overflow-hidden rounded-lg md:h-56">
              {cryptos.length > 0 ? (
                cryptos.map((group, index) => (
                  <div
                    key={index}
                    className={`${
                      index === currentSlide
                        ? "opacity-100 transition-opacity duration-1000 ease-in-out"
                        : "opacity-0 transition-opacity duration-1000 ease-in-out"
                    } absolute inset-0 flex justify-center gap-4`}
                  >
                    {group.map((crypto, idx) => (
                      <div key={idx} className="rounded-lg p-4 w-1/4 shadow-md">
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="w-16 mx-auto"
                        />
                        <h2 className="text-center font-bold text-lg">
                          {crypto.name}
                        </h2>
                        <p className="text-center text-gray-500">
                          {crypto.symbol ? crypto.symbol.toUpperCase() : "N/A"}
                        </p>
                        <p className="text-center text-green-500">
                          {keyCrypto}
                          {crypto.current_price
                            ? `${crypto.current_price}`
                            : "No Price Available"}
                        </p>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-center">
                  LocalStorage'da hech qanday kripto topilmadi.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
