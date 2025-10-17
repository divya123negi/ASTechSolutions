import React from "react";

export default function Skeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>

          {/* Details Placeholder */}
          <div className="p-6 flex flex-col flex-grow gap-2">
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="flex flex-wrap gap-2 mt-auto">
              <div className="h-4 bg-gray-200 rounded-full w-12"></div>
              <div className="h-4 bg-gray-200 rounded-full w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
