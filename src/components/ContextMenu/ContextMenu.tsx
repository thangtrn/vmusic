import React from 'react';
import Tippy from '@tippyjs/react/headless';
import { toast } from 'react-toastify';

import { BsDownload } from 'react-icons/bs';
import { IoIosShareAlt } from 'react-icons/io';
import { TbPlaylistAdd } from 'react-icons/tb';
import { replaceAll } from '~/helpers';
import SubContextMenu from './SubContextMenu';
import { Trash } from 'iconsax-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { musicApi } from '~/axios';
import ShareContextMenu from './ShareContextMenu';

interface ContextMenuProps {
   children?: React.ReactElement;
   songData: ISong;
   setShowPopper?: (state: boolean) => void;
   offsetBar?: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
   children,
   songData,
   setShowPopper,
   offsetBar = false,
}) => {
   const location = useLocation();
   const params = useParams();
   const navigate = useNavigate();

   const handleHide = () => {
      if (setShowPopper) {
         setShowPopper(false);
      }
   };

   const handleShow = () => {
      if (setShowPopper) {
         setShowPopper(true);
      }
   };

   const downloadFile = async () => {
      const url = `http://api.mp3.zing.vn/api/streaming/audio/${songData?.tag}/320`;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';

      const fileExtension = 'mp3';
      link.download = `${replaceAll(songData.name)}.${fileExtension}`;
      link.click();

      // update download count
      await musicApi.updateDownload(songData?.id);
   };

   const handleDelete = async () => {
      try {
         await musicApi.removeSongFromPlaylist(params.id!, songData?.id);
         navigate(0); // reload
         toast.success('Đã xoá bài hát ra khỏi playlist');
      } catch (error) {
         console.log(error);
         toast.error('Đã có lỗi');
      }
   };

   return (
      <Tippy
         allowHTML
         interactive
         trigger="click"
         zIndex={10}
         placement={offsetBar ? 'bottom-start' : 'right-start'}
         offset={[32, 0]}
         onHide={handleHide}
         onShow={handleShow}
         render={(attrs) => (
            <div {...attrs}>
               <ul className="py-[10px] shadow-menu-context bg-primary-color rounded-lg w-[250px] text-title-color">
                  <li className="hover:bg-alpha-color hover:text-purple-color">
                     <button
                        onClick={downloadFile}
                        className="fy-center w-full py-[10px] px-5 text-sm"
                     >
                        <div className="w-8">
                           <BsDownload />
                        </div>
                        <span className="leading-normal">Tải xuống</span>
                     </button>
                  </li>
                  {location.pathname.startsWith('/playlist') ? (
                     <li className="hover:bg-alpha-color hover:text-purple-color">
                        <button
                           onClick={handleDelete}
                           className="fy-center w-full py-[10px] px-5 text-sm"
                        >
                           <div className="w-8">
                              <Trash size={16} />
                           </div>
                           <span className="leading-normal">Xoá khỏi playlist</span>
                        </button>
                     </li>
                  ) : (
                     <li className="hover:bg-alpha-color relative group">
                        <Tippy
                           allowHTML
                           interactive
                           placement="right-start"
                           render={() => <SubContextMenu data={songData} />}
                        >
                           <button className="fy-center w-full py-[10px] px-5 text-sm hover:text-purple-color">
                              <span className="w-8">
                                 <TbPlaylistAdd size={18} />
                              </span>
                              <span className="leading-normal">Thêm vào playlist</span>
                           </button>
                        </Tippy>
                     </li>
                  )}
                  <li className="hover:bg-alpha-color hover:text-purple-color">
                     <Tippy
                        allowHTML
                        interactive
                        placement="right-start"
                        render={() => <ShareContextMenu data={songData} />}
                     >
                        <button className="fy-center w-full py-[10px] px-5 text-sm">
                           <span className="w-8">
                              <IoIosShareAlt size={18} />
                           </span>
                           <span className="leading-normal">Chia sẻ</span>
                        </button>
                     </Tippy>
                  </li>
               </ul>
            </div>
         )}
      >
         {children}
      </Tippy>
   );
};

export default ContextMenu;
