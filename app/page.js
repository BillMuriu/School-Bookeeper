import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselDemo() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Add iframe below the title */}
      <div className="mt-8">
        {" "}
        {/* Adds spacing between the title and iframe */}
        <iframe
          src="http://localhost:5173/#/operations-ledger"
          title="Dashboard Iframe"
          width="100%"
          height="600px"
          className="border border-gray-300" // Optional styling for the iframe
        />
      </div>
    </div>
  );
}
