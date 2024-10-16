import React, { useState, useEffect } from "react";
import { STUDENTS } from "@/constants";
import MenuItem from "./menu-item";

const StudentMenuList = ({ pathname }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(STUDENTS.length).fill(false)
  );

  useEffect(() => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        STUDENTS[idx].submenu && pathname.includes(STUDENTS[idx].path)
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
      <p className="text-sm leading-tight text-secondary-foreground">
        Students
      </p>
      {STUDENTS.map((item, idx) => (
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

export default StudentMenuList;
