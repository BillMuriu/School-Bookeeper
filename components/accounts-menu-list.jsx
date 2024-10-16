import React, { useState, useEffect } from "react";
import { ACCOUNTS } from "@/constants";
import MenuItem from "./menu-item";

const AccountsMenuList = ({ pathname }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(ACCOUNTS.length).fill(false)
  );

  useEffect(() => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        ACCOUNTS[idx].submenu && pathname.includes(ACCOUNTS[idx].path)
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
      <p className="text-sm leading-tight">Accounts</p>

      {ACCOUNTS.map((item, idx) => (
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

export default AccountsMenuList;
