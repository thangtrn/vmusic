import React from 'react';
import { Link } from 'react-router-dom';
import usePortal from 'react-cool-portal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AddSquare, Home, PlayCircle } from 'iconsax-react';
import { NavItem } from '~/components/Sidebar';
import { CreatePlaylistModal } from '~/components/Playlist';
import { TOAST_MESSAGE } from '~/utils';
import { isLoginSelector } from '~/redux/selector';
import { logo } from '~/assets';

const Sidebar: React.FC = () => {
   const { Portal, toggle, hide } = usePortal({ defaultShow: false });
   const isLogin = useSelector(isLoginSelector);

   const handleToggleModal = () => {
      if (isLogin) {
         toggle();
      } else {
         toast.warning(TOAST_MESSAGE.loginRequired);
      }
   };

   return (
      <aside className="w-sidebar h-full bg-sidebar-color flex flex-col">
         <Link to="/" className="h-header fy-center pl-5">
            <div className="w-10 h-10">
               <img src={logo} alt="" className="w-full h-full" />
            </div>
            <span className="ml-2 font-bold text-sidebar-popup-color">VMusic</span>
         </Link>
         <div className="flex-1">
            <div className="w-full mb-[15px]">
               <NavItem to="/" Icon={Home}>
                  Trang chủ
               </NavItem>
               <NavItem to="/top-download" Icon={Home}>
                  Top download
               </NavItem>
               <NavItem to="/top-listen" Icon={Home}>
                  Bảng xếp hạng
               </NavItem>
               <NavItem to="/youtube" Icon={Home}>
                  Youtube
               </NavItem>
               {isLogin ? (
                  <NavItem to="/library" Icon={Home}>
                     Thư viện
                  </NavItem>
               ) : (
                  <li className="text-navigation-color group">
                     <button
                        onClick={() => toast.warning(TOAST_MESSAGE.loginRequired)}
                        className={
                           'fy-center w-full h-12 pr-5 pl-4 cursor-pointer text-sm font-medium border-l-4 transition ease-in-out capitalize hover:text-hover-color'
                        }
                     >
                        {
                           <span className="w-9">
                              <Home size={20} />
                           </span>
                        }
                        <span>Thư viện</span>
                        <PlayCircle
                           size="18"
                           className="ml-auto hidden text-purple-color group-hover:inline-block"
                        />
                     </button>
                  </li>
               )}
            </div>
         </div>

         <button
            onClick={handleToggleModal}
            className="h-[54px] fy-center px-5 border-t border-border-color text-navigation-color text-sm font-medium hover:text-hover-color"
         >
            <span className="w-[36px] text-[#c6c6c6]">
               <AddSquare size={24} variant="Bold" />
            </span>
            <span>Tạo playlist mới</span>
         </button>

         <Portal>
            <CreatePlaylistModal hide={hide} />
         </Portal>
      </aside>
   );
};

export default Sidebar;
