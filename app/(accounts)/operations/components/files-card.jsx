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

const FilesCard = ({
  title,
  description,
  buttonText,
  buttonVariant,
  viewAllText,
  viewAllLink,
  addNewLink,
}) => {
  return (
    <Card className="mb-6 lg:mb-0 lg:max-w-[400px] border-none relative shadow-xl z-10">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="w-full pl-6 flex justify-between">
        <Link href={viewAllLink} passHref>
          <Badge className="px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:underline">
            {viewAllText}
          </Badge>
        </Link>
        <Link href={addNewLink} passHref>
          <Badge className="px-2 py-1 text-sm text-black bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:underline">
            <PlusCircle className="mr-1 w-4 h-4" /> {buttonText}
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FilesCard;
