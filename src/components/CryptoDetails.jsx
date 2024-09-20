import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./chart/LineChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CryptoDetails() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCrypto() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const fetchedCrypto = await response.json();

        setCrypto(fetchedCrypto);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCrypto();
  }, [id]);

  if (!crypto) {
    return <p>Loading...</p>;
  }

  if (error)
    return (
      <div>
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Danger alert!</span> Change a few things up
          and try submitting again.
        </div>
      </div>
    );

  return (
    <div className="flex gap-2">
      <div>
        <div className="card w-[548px]">
          <figure className="px-10 pt-10">
            <img
              src={crypto.image.large}
              alt="bitcoin"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center">
            <h2 className="card-title font-montserrat text-[48px] font-bold leading-[56.02px] text-left text-white">
              {crypto.name}
            </h2>
            <p className="font-montserrat text-[16px] font-normal leading-[28px] tracking-[0.15px] text-left line-clamp-5">
              {crypto.description.en}
            </p>
          </div>
        </div>
        <div className="font-montserrat text-2xl font-bold leading-[32.02px] text-left text-white pl-8 flex flex-col">
          <div>Rank: {crypto.market_cap_rank}</div>
          <div>Current Price: {crypto.market_data.current_price.usd}</div>
          <div>Market Cap: {crypto.market_data.market_cap.usd}</div>
        </div>
      </div>
      <div className="border"></div>
      <div className="grow">
        <LineChart />
      </div>
    </div>
  );
}
