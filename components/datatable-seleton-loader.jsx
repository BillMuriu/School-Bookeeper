import React from "react";
import { Skeleton } from "./ui/skeleton";

const DataTableSkeleton = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="flex space-x-6">
          <Skeleton className="w-32 h-8 bg-gray-300" />
          <Skeleton className="w-64 h-8 bg-gray-300" />
          <Skeleton className="w-48 h-8 bg-gray-300" />
        </div>
        {/* Rows skeleton */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex space-x-6">
              <Skeleton className="w-32 h-6 bg-gray-200" />
              <Skeleton className="w-64 h-6 bg-gray-200" />
              <Skeleton className="w-48 h-6 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTableSkeleton;
