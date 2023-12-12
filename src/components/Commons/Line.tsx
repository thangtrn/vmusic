import React from 'react';
import cx from 'classnames';

interface LineProps {
   type?: 'horizontal' | 'vertical';
   className?: string;
}

const Line: React.FC<LineProps> = ({ type = 'horizontal', className }) => {
   return (
      <div
         className={cx(
            'bg-border-color',
            type === 'horizontal'
               ? 'w-full h-[1px] my-[10px]'
               : 'h-full min-h-[12px] w-[1px] mx-[10px]',
            className,
         )}
      />
   );
};

export default Line;
