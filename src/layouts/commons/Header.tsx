import React from 'react';
import { ArrowLeft, ArrowRight, Logout, Profile, Setting2 } from 'iconsax-react';
import SearchBox from '../../components/SearchBox/SearchBox';
import { Button, Line } from '~/components/Commons';
import cx from 'classnames';
import { useHistoryStack } from '~/hooks';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { isLoginSelector, userSelector } from '~/redux/selector';
import usePortal from 'react-cool-portal';
import { AuthForm } from '~/components/Auth';

interface HeaderProps {
   isSticky: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSticky }) => {
   const navigate = useNavigate();
   const { stack, active, setActive } = useHistoryStack();
   const dispatch = useDispatch();
   const isLogin = useSelector(isLoginSelector);
   const { image } = useSelector(userSelector);

   const { Portal, toggle, hide } = usePortal({ defaultShow: false });

   const handleGoBack = () => {
      if (active > 0) {
         navigate(-1);
         setActive(active - 1);
      }
   };
   const handleGoForward = () => {
      if (active < stack.length) {
         navigate(1);
         setActive(active + 1);
      }
   };
   return (
      <section
         className={cx(
            'h-header sticky top-0 inset-x-0 px-section fy-center z-20',
            isSticky && 'bg-header-color shadow-header backdrop-blur-[50px]',
         )}
      >
         <div className="flex w-full">
            <button
               onClick={handleGoBack}
               className="w-10 h-10 disabled:opacity-30 disabled:cursor-not-allowed"
               disabled={active === 0}
            >
               <ArrowLeft size="22" />
            </button>

            <button
               onClick={handleGoForward}
               className="w-10 h-10 disabled:opacity-30 disabled:cursor-not-allowed"
               disabled={active === stack.length}
            >
               <ArrowRight size="22" />
            </button>

            <SearchBox />
         </div>

         <div className="fy-center gap-3">
            <Button
               tippyContent="Cài đặt"
               className="!w-10 !h-10 bg-alpha-color hover:brightness-75"
            >
               <Setting2 size="22" />
            </Button>
            <Tippy
               interactive
               trigger="click"
               placement="bottom-end"
               zIndex={10}
               render={(attrs) => (
                  <div {...attrs}>
                     <ul className="py-2 shadow-menu-context bg-primary-color rounded-lg w-60">
                        {!isLogin ? (
                           <>
                              <li className="hover:bg-alpha-color hover:text-purple-color">
                                 <button
                                    onClick={toggle}
                                    className="fy-center w-full py-[10px] px-5 text-sm"
                                 >
                                    <div className="w-8">
                                       <Profile size="18" />
                                    </div>
                                    <span className="leading-normal">Đăng nhập</span>
                                 </button>
                              </li>
                              <Portal>
                                 <AuthForm onClose={hide} />
                              </Portal>
                           </>
                        ) : (
                           <>
                              <li className="hover:bg-alpha-color hover:text-purple-color">
                                 <Link
                                    to="/profile"
                                    className="fy-center w-full py-[10px] px-5 text-sm"
                                 >
                                    <div className="w-8">
                                       <Profile size="18" />
                                    </div>
                                    <span className="leading-normal">Cá nhân</span>
                                 </Link>
                              </li>
                              <Line />
                              <li className="hover:bg-alpha-color hover:text-purple-color">
                                 <button
                                    onClick={() => dispatch(logout())}
                                    className="fy-center w-full py-[10px] px-5 text-sm"
                                 >
                                    <div className="w-8">
                                       <Logout size="18" />
                                    </div>
                                    <span className="leading-normal">Đăng xuất</span>
                                 </button>
                              </li>
                           </>
                        )}
                     </ul>
                  </div>
               )}
            >
               <Button className="!w-10 !h-10 hover:brightness-75">
                  <div className="w-full h-full rounded-full overflow-hidden">
                     <img
                        className="w-full h-full object-cover"
                        src={
                           image.length > 0
                              ? image
                              : 'https://dff.vn/uploads/avatar/2022/05/06/default-avatar-1651810836.png'
                        }
                        alt=""
                     />
                  </div>
               </Button>
            </Tippy>
         </div>
      </section>
   );
};

export default Header;
