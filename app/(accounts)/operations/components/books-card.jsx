import React from "react";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const BooksCard = ({ title, description, viewAllText, viewAllLink }) => {
  return (
    <Card className="mb-6 lg:mb-0 lg:max-w-[400px] border border-border bg-card/60 text-card-foreground backdrop-blur-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="w-full pl-6 flex justify-between">
        <Link href={viewAllLink} passHref>
          <Badge className="px-2 py-1 text-sm text-foreground bg-muted border border-border hover:bg-muted/80 hover:underline">
            {viewAllText}
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BooksCard;
