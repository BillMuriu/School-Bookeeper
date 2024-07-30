import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BooksCard = ({ title, description, buttonText, buttonVariant, viewAllText }) => {
  return (
    <Card className="mb-6 lg:mb-0 lg:max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="w-full pl-6 flex justify-between">
        <Button 
          variant="outline"
        >
          {viewAllText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BooksCard;
