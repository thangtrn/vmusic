import React from 'react';
import cx from 'classnames';

interface ButtonProps {
   children: React.ReactNode;
   active?: boolean;
   onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, active = false, onClick }) => {
   return (
      <button
         onClick={onClick}
         className={cx(
            'mr-[15px] py-1 px-6 border rounded-full uppercase text-xs font-normal leading-normal select-none',
            active ? 'bg-purple-color text-primary-color' : 'bg-transparent border-border-color',
         )}
      >
         {children}
      </button>
   );
};
export default Button;
