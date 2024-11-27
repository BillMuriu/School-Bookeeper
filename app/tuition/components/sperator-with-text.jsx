// components/CenteredTextWithSeparators.jsx
import React from 'react';
import { Separator } from '@/components/ui/separator';

const SeparatorWithText = ({ text }) => {
  return (
    <div className='flex items-center gap-1 justify-center w-full overflow-x-hidden'>
      <Separator className="w-[30%]" />
      <div className='text-medium font-bold'>
        {text}
      </div>
      <Separator className="w-[30%]" />
    </div>
  );
};

export default SeparatorWithText;
