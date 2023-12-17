import React from 'react';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { Button } from '../Commons';
import { Clock, More, Trash } from 'iconsax-react';
import Tippy from '@tippyjs/react/headless';
import { useDispatch } from 'react-redux';
import { clearHistory, clearPlaylistSongs } from '~/redux/slices/musicSlice';
import { toast } from 'react-toastify';

interface HeaderProps {
   tabs: ITab[];
   activeTab: number;
   setActiveTab: (id: number) => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, activeTab, setActiveTab }) => {
   const dispatch = useDispatch();

   const handleDeletePlaylist = () => {
      dispatch(clearPlaylistSongs());
      toast.success('Xoá danh sách phát thành công');
   };

   const handleDeleteHistory = () => {
      dispatch(clearHistory());
      toast.success('Xoá lịch sử nghe nhạc thành công');
   };

   return (
      <div className="fx-between py-[14px] px-2">
         <motion.div className="flex flex-1 w-fit p-[3px] bg-alpha-color rounded-full">
            {tabs.map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cx(
                     'relative f-center flex-grow flex-shrink-0 py-[5px] rounded-full flex-1',
                     activeTab === tab.id
                        ? 'text-progressbar-active font-medium'
                        : 'text-navigation-color hover:text-progressbar-active font-normal',
                  )}
               >
                  <motion.span className="relative text-xs select-none cursor-pointer z-10">
                     {tab.label}
                  </motion.span>
                  {activeTab === tab.id && (
                     <motion.div
                        layoutId="underline"
                        className="absolute inset-0 bg-primary-color rounded-full shadow-tab"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.3 }}
                     />
                  )}
               </button>
            ))}
         </motion.div>

         <div className="f-center">
            <Button tippyContent="Hẹn giờ" className="bg-alpha-color ml-2">
               <Clock size={16} />
            </Button>
            <Tippy
               allowHTML
               interactive
               trigger="click"
               zIndex={10}
               placement={'bottom-end'}
               offset={[0, 10]}
               render={(attrs) => (
                  <div {...attrs}>
                     <ul className="py-2 shadow-menu-context bg-primary-color rounded-lg w-52">
                        <li className="hover:bg-alpha-color hover:text-purple-color">
                           <button
                              onClick={handleDeletePlaylist}
                              className="fy-center w-full py-2 px-4 text-xs"
                           >
                              <div className="w-8">
                                 <Trash size={16} />
                              </div>
                              <span className="leading-normal">Xoá danh sách phát</span>
                           </button>
                        </li>
                        <li className="hover:bg-alpha-color hover:text-purple-color">
                           <button
                              onClick={handleDeleteHistory}
                              className="fy-center w-full py-2 px-4 text-xs"
                           >
                              <div className="w-8">
                                 <Trash size={16} />
                              </div>
                              <span className="leading-normal">Xoá lịch sử nghe nhạc</span>
                           </button>
                        </li>
                     </ul>
                  </div>
               )}
            >
               <Button tippyContent="Khác" className="bg-alpha-color ml-2">
                  <More size={16} />
               </Button>
            </Tippy>
         </div>
      </div>
   );
};

export default Header;
