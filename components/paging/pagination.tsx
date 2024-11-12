"use client";

// components/Pagination.tsx

import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <span className="text-white">
        {currentPage} / {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
