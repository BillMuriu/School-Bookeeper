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
    <Card className="mb-6 lg:mb-0 lg:max-w-[400px] border border-border bg-green text-card-foreground shadow-sm z-10">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full pl-6 flex justify-between">
        <Link href={viewAllLink} passHref>
          <Badge className="px-2 py-1 text-sm text-accent-foreground bg-accent border border-border hover:bg-muted hover:text-foreground transition-colors">
            {viewAllText}
          </Badge>
        </Link>
        <Link href={addNewLink} passHref>
          <Badge className="px-2 py-1 text-sm text-accent-foreground bg-accent border border-border hover:bg-muted hover:text-foreground transition-colors">
            <PlusCircle className="mr-1 w-4 h-4 text-accent-foreground" />{" "}
            {buttonText}
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FilesCard;
