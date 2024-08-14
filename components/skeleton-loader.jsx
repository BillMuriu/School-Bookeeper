import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="mt-3 flex justify-center items-start min-h-screen">
      <div className="mt-3 w-full max-w-sm flex flex-col justify-center items-center gap-6">
        <Skeleton className="w-96 h-6 rounded-2xl" />
        <Skeleton className="w-96 h-6 rounded-2xl" />
        <Skeleton className="w-96 h-6 rounded-2xl" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
