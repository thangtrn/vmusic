import React from 'react';
import { Facebook } from 'iconsax-react';
import { FacebookShareButton } from 'react-share';

interface ShareContextMenuProps {
   data: ISong;
}

const ShareContextMenu: React.FC<ShareContextMenuProps> = ({ data }) => {
   const baseUrl = import.meta?.env?.VITE_BASE_URL || window?.location?.origin?.toString();

   return (
      <ul className="py-[10px] shadow-menu-context bg-primary-color rounded-lg w-[250px]">
         <li className="hover:bg-alpha-color hover:text-purple-color">
            <FacebookShareButton
               url={`${baseUrl}/song/${data?.id}`}
               hashtag="#vmusic"
               className="w-full"
            >
               <div className="fy-center w-full py-[10px] px-5 text-sm">
                  <div className="w-8">
                     <Facebook size={16} />
                  </div>
                  <span className="leading-normal">Facebook</span>
               </div>
            </FacebookShareButton>
         </li>
      </ul>
   );
};

export default ShareContextMenu;
