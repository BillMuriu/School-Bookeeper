'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useHeaderContext } from '@/contexts/header-context';
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from './ui/sheet';
import { SIDENAV_ITEMS } from '@/constants';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import { Button } from './ui/button';
import { Icon } from '@iconify/react';

export const HeaderMobile = () => {
  const { handleClick, handleOpen, sheetCloseRef, sheetOpenRef, toggleSubMenu, subMenuOpen } = useHeaderContext();
  const pathname = usePathname()

  return (
    <div>
      <Sheet>
        <SheetTrigger ref={sheetOpenRef} className='hidden'>Open</SheetTrigger>
        <SheetClose ref={sheetCloseRef} className='hidden'>Close</SheetClose>
        <SheetContent side="left">
          <SheetHeader className='flex flex-row items-center justify-center border-b'>
            <h1>This is the header</h1>
          </SheetHeader>
          <ScrollArea className="rounded-md w-full">
            <ul className="grid w-full gap-2 py-5 max-h-screen">
              {SIDENAV_ITEMS.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <>
                      <Button
                        variant='ghost'
                        className={`flex w-full text-base ${pathname.includes(item.path) ? 'font-bold bg-accent text-accent-foreground' : ''}`}
                        onClick={() => toggleSubMenu(idx)}
                      >
                        <div className="flex flex-row justify-between w-full items-center">
                          <div className='flex align-center gap-4'>
                            <span>{item.icon}</span>
                            <span className={`font-normal ${pathname.includes(item.path) ? 'font-bold' : ''}`}>{item.title}</span>
                          </div>
                          <div className={`${subMenuOpen[idx] ? 'rotate-180' : ''}`}>
                            <Icon icon="lucide:chevron-down" width="16" height="16" />
                          </div>
                        </div>
                      </Button>
                      <div className="mt-2 ml-10 flex flex-col border-l border-border space-y-2 justify-start">
                        {subMenuOpen[idx] &&
                          item.subMenuItems?.map((subItem, subIdx) => (
                            <Link key={subIdx} href={subItem.path} className='w-full flex flex-row items-center justify-start' onClick={handleClick}>
                              <Button
                                variant="outlined"
                                className={`flex items-center pl-5 justify-between w-full hover:underline ${subItem.path === pathname ? 'font-bold underline' : ''}`}
                              >
                                {subItem.title}
                              </Button>
                            </Link>
                          ))}
                      </div>
                    </>
                  ) : (
                    <Link href={item.path} onClick={handleClick} className='w-full flex flex-row items-center justify-start'>
                      <Button
                        variant='ghost'
                        className={`w-full font-normal text-base flex items-center justify-start gap-4 ${pathname === item.path ? 'font-bold bg-accent text-accent-foreground' : ''}`}
                      >
                        <span>{item.icon}</span>
                        {item.title}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </ul>

            <Button>
              Heading 2
            </Button>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
