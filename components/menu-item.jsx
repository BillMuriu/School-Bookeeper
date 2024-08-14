import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const MenuItem = ({ item, isOpen, pathname, toggleSubMenu }) => {
  return (
    <div>
      {item.submenu ? (
        <>
          <Button
            variant="ghost"
            className={`flex w-full text-base ${
              pathname.includes(item.path)
                ? "font-bold bg-accent text-accent-foreground"
                : ""
            }`}
            onClick={toggleSubMenu}
          >
            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex align-center gap-4">
                <span>{item.icon}</span>
                <span
                  className={`${
                    pathname.includes(item.path) ? "font-bold" : ""
                  }`}
                >
                  {item.title}
                </span>
              </div>
              <div
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                <ChevronRightIcon width={16} height={16} />
              </div>
            </div>
          </Button>
          <div
            className={`mt-2 ml-8 flex flex-col space-y-2 justify-start overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-screen opacity-100 transform scale-100"
                : "max-h-0 opacity-0 transform scale-95"
            }`}
          >
            {item.subMenuItems?.map((subItem, subIdx) => (
              <Link
                key={subIdx}
                href={subItem.path}
                className="w-full flex flex-row items-center justify-start"
              >
                <Button
                  variant="outlined"
                  className={`flex items-center pl-5 justify-between w-full hover:underline ${
                    subItem.path === pathname ? "font-bold underline" : ""
                  }`}
                >
                  {subItem.title}
                </Button>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={item.path}
          className="w-full flex flex-row items-center justify-start"
        >
          <Button
            variant="ghost"
            className={`w-full text-base flex items-center justify-start gap-4 ${
              pathname === item.path
                ? "font-bold bg-accent text-accent-foreground"
                : ""
            }`}
          >
            <span>{item.icon}</span>
            {item.title}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
