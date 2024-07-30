'use client'

import React, { createContext, useRef, useState, useContext, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const pathname = usePathname();
  const sheetCloseRef = useRef(null);
  const sheetOpenRef = useRef(null); // Add this line
  const [subMenuOpen, setSubMenuOpen] = useState(Array(SIDENAV_ITEMS.length).fill(false));

  const toggleSubMenu = useCallback((index) => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (idx === index ? !isOpen : isOpen))
    );
  }, []);

  useEffect(() => {
    setSubMenuOpen((prevState) =>
      prevState.map((isOpen, idx) => (pathname.includes(SIDENAV_ITEMS[idx].path) ? isOpen : false))
    );
  }, [pathname]);

  const handleClick = () => {
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  const handleOpen = () => { // Add this function
    if (sheetOpenRef.current) {
      sheetOpenRef.current.click();
    }
  };

  return (
    <HeaderContext.Provider value={{ handleClick, sheetCloseRef, sheetOpenRef, handleOpen, toggleSubMenu, subMenuOpen }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContex = () => {
  return useContext(HeaderContext);
};
;
