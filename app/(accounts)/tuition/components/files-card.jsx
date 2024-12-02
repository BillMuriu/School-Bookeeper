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
import Link from 'next/link';

const FilesCard = ({ title, description, buttonText, buttonVariant, viewAllText, viewAllLink, addNewLink }) => {
  return (
    <Card className="mb-6 lg:mb-0 lg:max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="w-full pl-6 flex justify-between">
        <Link href={viewAllLink} passHref>
          <Button variant="outline">
            {viewAllText}
          </Button>
        </Link>
        <Link href={addNewLink} passHref>
          <Button variant="secondary">
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FilesCard;
