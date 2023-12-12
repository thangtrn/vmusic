import React from 'react';
import cx from 'classnames';
import { NavLink, To } from 'react-router-dom';

interface TabItemProps {
   label: string;
   link: To;
}

const TabItem: React.FC<TabItemProps> = ({ label, link }) => {
   return (
      <li className="mx-5 h-fit">
         <NavLink
            to={link}
            className={({ isActive }) =>
               cx(
                  'block py-[15px] hover:text-progressbar-active',
                  isActive &&
                     'text-progressbar-active relative after:absolute after:inset-x-0 after:top-full after:border-b-2 after:border-progressbar-active',
               )
            }
         >
            {label}
         </NavLink>
      </li>
   );
};

export default TabItem;
