import React, { useState, useEffect } from "react";
import { SIDENAV_ITEMS } from "@/constants";
import MenuItem from "./menu-item";

const MenuList = ({ pathname }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(SIDENAV_ITEMS.length).fill(false)
  );

  useEffect(() => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        SIDENAV_ITEMS[idx].submenu && pathname.includes(SIDENAV_ITEMS[idx].path)
          ? true
          : false
      )
    );
  }, [pathname]);

  const toggleSubMenu = (index) => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (idx === index ? !isOpen : false))
    );
  };

  return (
    <ul className="grid w-full gap-2 py-5 max-h-screen">
      <p className="text-sm leading-tight">General</p>
      {SIDENAV_ITEMS.map((item, idx) => (
        <MenuItem
          key={idx}
          item={item}
          isOpen={subMenuOpen[idx]}
          pathname={pathname}
          toggleSubMenu={() => toggleSubMenu(idx)}
        />
      ))}
    </ul>
  );
};

export default MenuList;
