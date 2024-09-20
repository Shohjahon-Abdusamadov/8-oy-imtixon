import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  Button,
  Flowbite,
} from "flowbite-react";
import { useCrypto } from "../context/CryptoContext";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Hero from "./Hero";
import Pagination from "./Pagination";

export default function CryptoTable() {
  const { cryptoData, loading, error, currency, keyCrypto, setKeyCrypto } =
    useCrypto();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    if (currency === "USD") {
      setKeyCrypto("$");
    } else if (currency === "INR") {
      setKeyCrypto("₹");
    } else if (currency === "EUR") {
      setKeyCrypto("€");
    }
  }, [currency]);

  const isFavorite = (cryptoId) => {
    return favorites.some((fav) => fav.id === cryptoId);
  };

  const handleAddToFavorites = (crypto) => {
    let updatedFavorites = [...favorites];

    if (isFavorite(crypto.id)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== crypto.id);
    } else {
      updatedFavorites.push(crypto);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    window.dispatchEvent(new Event("storage"));
  };

  const customTheme = {
    table: {
      row: {
        base: "group/row",
        hovered: "bg-inherit",
        striped: "bg-inherit",
      },
      head: {
        base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
        cell: {
          base: "bg-[#87CEEB] text-black px-[16px] py-[19.5px]",
        },
      },
      body: {
        base: "group/body",
        cell: {
          base: "bg-[#16171A] px-6 py-4 pl-0 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
        },
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-[1280px] mx-auto">
      <Hero />

      <h2 className="font-montserrat text-[34px] font-normal leading-[41.99px] tracking-[0.25px] text-center text-white mt-5 mb-3">
        Cryptocurrency Prices by Market Cap
      </h2>

      <input
        type="text"
        placeholder="Search For a Crypto Currency.."
        className="input w-full mb-4 border-slate-500 bg-inherit"
      />

      <Flowbite theme={{ theme: customTheme }}>
        <Table className="bg-inherit">
          <TableHead>
            <TableHeadCell>Coin</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>24h Change</TableHeadCell>
            <TableHeadCell>Market Cap</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {cryptoData.map((c) => {
              const isFav = isFavorite(c.id);

              return (
                <TableRow
                  key={c.id}
                  className="bg-white dark:border-gray-800 border-blue-700 dark:bg-gray-800"
                  style={{backgroundColor: '#16171A'}}
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-3 items-center">
                    <div>
                      <img width={50} height={50} src={c.image} alt="image" />
                    </div>
                    <div>
                      <div>
                        <Link to={`/crypto-details/${c.id}`}>
                          {c.symbol.toUpperCase()}
                        </Link>
                      </div>
                      <div className="font-roboto text-sm font-normal leading-[20px] tracking-[0.15px] text-left text-gray-400">
                        {c.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {keyCrypto}
                    {c.current_price}
                  </TableCell>
                  <TableCell
                    className="flex items-center gap-2"
                    style={{
                      color: `${
                        c.price_change_percentage_24h > 0 ? "green" : "red"
                      }`,
                    }}
                  >
                    <Button
                      className="border-none"
                      onClick={() => handleAddToFavorites(c)}
                    >
                      <FaEye
                        className="text-2xl"
                        color={isFav ? "green" : "white"}
                      />
                    </Button>
                    {c.price_change_percentage_24h}%
                  </TableCell>
                  <TableCell>{c.market_cap}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Pagination />
      </Flowbite>
    </div>
  );
}
