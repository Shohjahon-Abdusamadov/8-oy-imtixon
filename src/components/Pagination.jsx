"use client";

import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useCrypto } from "../context/CryptoContext";

export default function Component() {
  const { page, setPage } = useCrypto();
  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setPage(newPage); // Sahifani yangilash
  };

  const customTheme = {
    base: "",
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px bg-[#16171A]",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border-none px-3 py-2 leading-tight text-gray-500 bg-[#16171A]",
        icon: "h-5 w-5 bg-[#16171A]",
      },
      next: {
        base: "rounded-r-lg border-none px-3 py-2 leading-tight text-gray-500 bg-[#16171A]",
        icon: "h-5 w-5 bg-[#16171A]",
      },
      selector: {
        base: "w-12 py-2 leading-tight bg-[#16171A] text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-[#16171A] dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active:
          "text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-[#16171A] dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        theme={{ theme: customTheme }}
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
        showIcons
        previousLabel=""
        nextLabel=""
      />
    </div>
  );
}
