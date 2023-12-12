import React from 'react';
import cx from 'classnames';
import { NavLink, To, useLocation } from 'react-router-dom';
import { PlayCircle } from 'iconsax-react';

interface NavItemProps {
   children?: React.ReactNode;
   to: To;
   Icon: React.ElementType;
   onClick?: (e: React.MouseEvent) => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, to, Icon, onClick = () => {} }) => {
   const { pathname } = useLocation();
   return (
      <li className="text-navigation-color group">
         <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }: { isActive: boolean }): string =>
               cx(
                  'fy-center w-full h-12 pr-5 pl-4 cursor-pointer text-sm font-medium border-l-4 transition ease-in-out capitalize',
                  isActive
                     ? 'border-purple-color bg-alpha-color text-purple-color'
                     : 'hover:text-hover-color',
               )
            }
         >
            {
               <span className="w-9">
                  <Icon size={20} />
               </span>
            }
            <span>{children}</span>
            {pathname !== to && (
               <PlayCircle
                  size="18"
                  className="ml-auto hidden text-purple-color group-hover:inline-block"
               />
            )}
         </NavLink>
      </li>
   );
};

export default NavItem;
