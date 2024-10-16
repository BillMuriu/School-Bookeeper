import React, { useState, useEffect } from "react";
import { EXTRAS } from "@/constants";
import MenuItem from "./menu-item";

const ExtrasMenuList = ({ pathname }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(EXTRAS.length).fill(false)
  );

  useEffect(() => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        EXTRAS[idx].submenu && pathname.includes(EXTRAS[idx].path)
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
      <p className="text-xs leading-tight">Extras</p>
      {EXTRAS.map((item, idx) => (
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

export default ExtrasMenuList;
