import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Icon } from '@iconify/react';

const MenuItem = ({ item, isOpen, pathname, toggleSubMenu }) => {
  return (
    <div>
      {item.submenu ? (
        <>
          <Button
            variant='ghost'
            className={`flex w-full text-base ${pathname.includes(item.path) ? 'font-bold bg-accent text-accent-foreground' : ''}`}
            onClick={toggleSubMenu}
          >
            <div className="flex flex-row justify-between w-full items-center">
              <div className='flex align-center gap-4'>
                <span>{item.icon}</span>
                <span className={`${pathname.includes(item.path) ? 'font-bold' : ''}`}>{item.title}</span>
              </div>
              <div className={`${isOpen ? 'rotate-180' : ''}`}>
                <Icon icon="lucide:chevron-down" width="16" height="16" />
              </div>
            </div>
          </Button>
          <div className="mt-2 flex border-l border-border ml-10 flex-col space-y-2 justify-start">
            {isOpen &&
              item.subMenuItems?.map((subItem, subIdx) => (
                <Link key={subIdx} href={subItem.path} className='w-full flex flex-row items-center justify-start'>
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
        <Link href={item.path} className='w-full flex flex-row items-center justify-start'>
          <Button
            variant='ghost'
            className={`w-full text-base flex items-center justify-start gap-4 ${pathname === item.path ? 'font-bold bg-accent text-accent-foreground' : ''}`}
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
