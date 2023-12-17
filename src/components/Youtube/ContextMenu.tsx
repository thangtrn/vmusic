import React from 'react';
import Tippy from '@tippyjs/react/headless';

import { BsDownload } from 'react-icons/bs';
import { replaceAll } from '~/helpers';
import { musicApi } from '~/axios';
import { Trash } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { removeSongYtb } from '~/redux/slices/youtubeSlice';

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
   const dispatch = useDispatch();

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
      const url = songData?.songUrl;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';

      const fileExtension = 'mp3';
      link.download = `${replaceAll(songData.name)}.${fileExtension}`;
      link.click();

      // update download count
      await musicApi.updateDownload(songData?.id);
   };

   const handleDelete = () => {
      dispatch(removeSongYtb(songData?.id));
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
               </ul>
            </div>
         )}
      >
         {children}
      </Tippy>
   );
};

export default ContextMenu;
