"use client";

import React, {
  createContext,
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS, ACCOUNTS, STUDENTS, EXTRAS } from "@/constants"; // Import EXTRAS as well

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const pathname = usePathname();
  const sheetCloseRef = useRef(null);
  const sheetOpenRef = useRef(null);

  // State for SIDENAV_ITEMS
  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(SIDENAV_ITEMS.length).fill(false)
  );

  // State for ACCOUNTS
  const [accountSubMenuOpen, setAccountSubMenuOpen] = useState(
    Array(ACCOUNTS.length).fill(false)
  );

  // State for STUDENTS
  const [studentSubMenuOpen, setStudentSubMenuOpen] = useState(
    Array(STUDENTS.length).fill(false)
  );

  // State for EXTRAS
  const [extraSubMenuOpen, setExtraSubMenuOpen] = useState(
    Array(EXTRAS.length).fill(false)
  );

  // Toggle submenu for SIDENAV_ITEMS
  const toggleSubMenu = useCallback((index) => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (idx === index ? !isOpen : isOpen))
    );
  }, []);

  // Toggle submenu for ACCOUNTS
  const toggleAccountSubMenu = useCallback((index) => {
    setAccountSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (idx === index ? !isOpen : isOpen))
    );
  }, []);

  // Toggle submenu for STUDENTS
  const toggleStudentSubMenu = useCallback((index) => {
    setStudentSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (idx === index ? !isOpen : isOpen))
    );
  }, []);

  // Toggle submenu for EXTRAS
  const toggleExtraSubMenu = useCallback((index) => {
    setExtraSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (idx === index ? !isOpen : isOpen))
    );
  }, []);

  // Effect to manage submenu open/close based on pathname for SIDENAV_ITEMS
  useEffect(() => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        pathname.includes(SIDENAV_ITEMS[idx].path) ? isOpen : false
      )
    );
  }, [pathname]);

  // Effect to manage submenu open/close based on pathname for ACCOUNTS
  useEffect(() => {
    setAccountSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        pathname.includes(ACCOUNTS[idx].path) ? isOpen : false
      )
    );
  }, [pathname]);

  // Effect to manage submenu open/close based on pathname for STUDENTS
  useEffect(() => {
    setStudentSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        pathname.includes(STUDENTS[idx].path) ? isOpen : false
      )
    );
  }, [pathname]);

  // Effect to manage submenu open/close based on pathname for EXTRAS
  useEffect(() => {
    setExtraSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) =>
        pathname.includes(EXTRAS[idx].path) ? isOpen : false
      )
    );
  }, [pathname]);

  const handleClick = () => {
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  const handleOpen = () => {
    if (sheetOpenRef.current) {
      sheetOpenRef.current.click();
    }
  };

  return (
    <HeaderContext.Provider
      value={{
        handleClick,
        sheetCloseRef,
        sheetOpenRef,
        handleOpen,
        toggleSubMenu,
        toggleAccountSubMenu, // Provide the toggle function for ACCOUNTS
        toggleStudentSubMenu, // Provide the toggle function for STUDENTS
        toggleExtraSubMenu, // Provide the toggle function for EXTRAS
        subMenuOpen,
        accountSubMenuOpen, // Provide the state for ACCOUNTS
        studentSubMenuOpen, // Provide the state for STUDENTS
        extraSubMenuOpen, // Provide the state for EXTRAS
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};
