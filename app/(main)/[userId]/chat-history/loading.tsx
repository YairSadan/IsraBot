import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingChatPage = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
      <div className="flex flex-row-reverse items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
      <div className="flex items-center mt-12">
        <Skeleton className="h-6 w-[600px]"/>
      </div>
    </div>
  );
};

export default LoadingChatPage;
