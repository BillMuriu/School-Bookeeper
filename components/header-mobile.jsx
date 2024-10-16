"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useHeaderContext } from "@/contexts/header-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { SIDENAV_ITEMS, ACCOUNTS, STUDENTS, EXTRAS } from "@/constants";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import SideNav from "./side-nav";

export const HeaderMobile = () => {
  const {
    handleClick,
    handleOpen,
    sheetCloseRef,
    sheetOpenRef,
    toggleSubMenu,
    toggleAccountSubMenu,
    toggleStudentSubMenu,
    toggleExtraSubMenu,
    subMenuOpen,
    accountSubMenuOpen,
    studentSubMenuOpen,
    extraSubMenuOpen,
  } = useHeaderContext();
  const pathname = usePathname();

  return (
    <div>
      <Sheet>
        <SheetTrigger ref={sheetOpenRef} className="hidden">
          Open
        </SheetTrigger>
        <SheetClose ref={sheetCloseRef} className="hidden">
          Close
        </SheetClose>
        <SheetContent side="left">
          <SheetHeader className="flex flex-row items-center justify-center border-b">
            <h1>This is the header</h1>
          </SheetHeader>
          <ScrollArea className="h-full w-full rounded-md ">
            <ul className="grid w-full gap-2 py-5 max-h-screen">
              <p className="text-sm leading-tight">General</p>
              {SIDENAV_ITEMS.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <>
                      <Button
                        variant="ghost"
                        className={`flex w-full text-base ${
                          pathname.includes(item.path)
                            ? "font-bold bg-accent text-accent-foreground"
                            : ""
                        }`}
                        onClick={() => toggleSubMenu(idx)}
                      >
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className="flex align-center gap-4">
                            <span>{item.icon}</span>
                            <span
                              className={`font-normal ${
                                pathname.includes(item.path) ? "font-bold" : ""
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          <div
                            className={`transition-transform duration-300 ${
                              subMenuOpen[idx] ? "rotate-90" : ""
                            }`}
                          >
                            <ChevronRightIcon width={16} height={16} />
                          </div>
                        </div>
                      </Button>
                      <div
                        className={`mt-2 ml-8 flex flex-col space-y-2 justify-start overflow-hidden transition-all duration-300 ease-in-out ${
                          subMenuOpen[idx]
                            ? "max-h-screen opacity-100 transform scale-100"
                            : "max-h-0 opacity-0 transform scale-95"
                        }`}
                      >
                        {subMenuOpen[idx] &&
                          item.subMenuItems?.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.path}
                              className="w-full flex flex-row items-center justify-start"
                              onClick={handleClick}
                            >
                              <Button
                                variant="outlined"
                                className={`flex items-center pl-5 justify-between w-full hover:underline ${
                                  subItem.path === pathname
                                    ? "font-bold underline"
                                    : ""
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
                      onClick={handleClick}
                      className="w-full flex flex-row items-center justify-start"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full font-normal text-base flex items-center justify-start gap-4 ${
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
              ))}
            </ul>

            <ul className="grid w-full gap-2 py-5 max-h-screen">
              <p className="text-sm leading-tight">Accounts</p>
              {ACCOUNTS.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <>
                      <Button
                        variant="ghost"
                        className={`flex w-full text-base ${
                          pathname.includes(item.path)
                            ? "font-bold bg-accent text-accent-foreground"
                            : ""
                        }`}
                        onClick={() => toggleAccountSubMenu(idx)}
                      >
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className="flex align-center gap-4">
                            <span>{item.icon}</span>
                            <span
                              className={`font-normal ${
                                pathname.includes(item.path) ? "font-bold" : ""
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          <div
                            className={`transition-transform duration-300 ${
                              accountSubMenuOpen[idx] ? "rotate-90" : ""
                            }`}
                          >
                            <ChevronRightIcon width={16} height={16} />
                          </div>
                        </div>
                      </Button>
                      <div
                        className={`mt-2 ml-8 flex flex-col space-y-2 justify-start overflow-hidden transition-all duration-300 ease-in-out ${
                          accountSubMenuOpen[idx]
                            ? "max-h-screen opacity-100 transform scale-100"
                            : "max-h-0 opacity-0 transform scale-95"
                        }`}
                      >
                        {accountSubMenuOpen[idx] &&
                          item.subMenuItems?.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.path}
                              className="w-full flex flex-row items-center justify-start"
                              onClick={handleClick}
                            >
                              <Button
                                variant="outlined"
                                className={`flex items-center pl-5 justify-between w-full hover:underline ${
                                  subItem.path === pathname
                                    ? "font-bold underline"
                                    : ""
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
                      onClick={handleClick}
                      className="w-full flex flex-row items-center justify-start"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full font-normal text-base flex items-center justify-start gap-4 ${
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
              ))}
            </ul>

            <ul className="grid w-full gap-2 py-5 max-h-screen">
              <p className="text-sm leading-tight">Students</p>
              {STUDENTS.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <>
                      <Button
                        variant="ghost"
                        className={`flex w-full text-base ${
                          pathname.includes(item.path)
                            ? "font-bold bg-accent text-accent-foreground"
                            : ""
                        }`}
                        onClick={() => toggleStudentSubMenu(idx)}
                      >
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className="flex align-center gap-4">
                            <span>{item.icon}</span>
                            <span
                              className={`font-normal ${
                                pathname.includes(item.path) ? "font-bold" : ""
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          <div
                            className={`transition-transform duration-300 ${
                              studentSubMenuOpen[idx] ? "rotate-90" : ""
                            }`}
                          >
                            <ChevronRightIcon width={16} height={16} />
                          </div>
                        </div>
                      </Button>
                      <div
                        className={`mt-2 ml-8 flex flex-col space-y-2 justify-start overflow-hidden transition-all duration-300 ease-in-out ${
                          studentSubMenuOpen[idx]
                            ? "max-h-screen opacity-100 transform scale-100"
                            : "max-h-0 opacity-0 transform scale-95"
                        }`}
                      >
                        {studentSubMenuOpen[idx] &&
                          item.subMenuItems?.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.path}
                              className="w-full flex flex-row items-center justify-start"
                              onClick={handleClick}
                            >
                              <Button
                                variant="outlined"
                                className={`flex items-center pl-5 justify-between w-full hover:underline ${
                                  subItem.path === pathname
                                    ? "font-bold underline"
                                    : ""
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
                      onClick={handleClick}
                      className="w-full flex flex-row items-center justify-start"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full font-normal text-base flex items-center justify-start gap-4 ${
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
              ))}
            </ul>

            <ul className="grid w-full gap-2 py-5 max-h-screen">
              <p className="text-sm leading-tight">Extras</p>
              {EXTRAS.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <>
                      <Button
                        variant="ghost"
                        className={`flex w-full text-base ${
                          pathname.includes(item.path)
                            ? "font-bold bg-accent text-accent-foreground"
                            : ""
                        }`}
                        onClick={() => toggleExtraSubMenu(idx)}
                      >
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className="flex align-center gap-4">
                            <span>{item.icon}</span>
                            <span
                              className={`font-normal ${
                                pathname.includes(item.path) ? "font-bold" : ""
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          <div
                            className={`transition-transform duration-300 ${
                              extraSubMenuOpen[idx] ? "rotate-90" : ""
                            }`}
                          >
                            <ChevronRightIcon width={16} height={16} />
                          </div>
                        </div>
                      </Button>
                      <div
                        className={`mt-2 ml-8 flex flex-col space-y-2 justify-start overflow-hidden transition-all duration-300 ease-in-out ${
                          extraSubMenuOpen[idx]
                            ? "max-h-screen opacity-100 transform scale-100"
                            : "max-h-0 opacity-0 transform scale-95"
                        }`}
                      >
                        {extraSubMenuOpen[idx] &&
                          item.subMenuItems?.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.path}
                              className="w-full flex flex-row items-center justify-start"
                              onClick={handleClick}
                            >
                              <Button
                                variant="outlined"
                                className={`flex items-center pl-5 justify-between w-full hover:underline ${
                                  subItem.path === pathname
                                    ? "font-bold underline"
                                    : ""
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
                      onClick={handleClick}
                      className="w-full flex flex-row items-center justify-start"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full font-normal text-base flex items-center justify-start gap-4 ${
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
              ))}
            </ul>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
