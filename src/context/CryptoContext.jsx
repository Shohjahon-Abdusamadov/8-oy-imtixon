import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "../components/Header";

const CryptoContext = createContext(null);

export const useCrypto = () => {
  return useContext(CryptoContext);
};

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [keyCrypto, setKeyCrypto] = useState("$");
  const [page, setPage] = useState(1);

  const fetchCryptos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      if (!response.ok) {
        throw new Error("Error fetching cryptocurrency data");
      }
      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, [currency, page]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        loading,
        error,
        currency,
        setCurrency,
        keyCrypto,
        setKeyCrypto,
        page,
        setPage,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
