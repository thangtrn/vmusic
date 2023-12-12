import React from 'react';

interface TabsProps {
   children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
   return (
      <ul className="fy-center flex-wrap text-sm font-medium leading-normal uppercase">
         {children}
      </ul>
   );
};

export default Tabs;
