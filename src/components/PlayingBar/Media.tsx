import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentSongSelector } from '~/redux/selector';
import Tippy from '@tippyjs/react';

import { Heart, More } from 'iconsax-react';
import { Button, Image } from '../Commons';
import { ContextMenu } from '../ContextMenu';

const Media: React.FC = () => {
   const currentSong = useSelector(currentSongSelector);
   const [showPopper, setShowPopper] = useState<boolean>(false);

   return (
      <div
         className="w-[30%] fy-center"
         onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
         <Link to="/">
            <Image src={currentSong?.image} className="w-16 h-16" />
         </Link>

         <div className="ml-[10px] pr-[10px]">
            <h3 className="text-sm leading-[1.36] font-medium line-clamp-1 hover:text-purple-color">
               <Tippy delay={1000} content={currentSong?.name}>
                  <Link to="/">{currentSong?.name}</Link>
               </Tippy>
            </h3>
            {currentSong?.tag === null || currentSong?.tag.toString().length <= 0 ? (
               <span className="text-xs leading-normal text-subtitle-color mt-[1px] line-clamp-1">
                  {currentSong?.description}
               </span>
            ) : (
               <span className="text-xs leading-normal italic text-subtitle-color mt-[1px] line-clamp-1">
                  Bản quyền thuộc {currentSong?.id === 'ytb' ? 'Youtube' : 'Zing-mp3'}
               </span>
            )}
         </div>

         {currentSong?.id !== 'ytb' && (
            <div className="fy-center ml-[10px]">
               <Button className="mx-[2px] hover:bg-alpha-color" tippyContent="Thêm vào thư viện">
                  <Heart size={15} />
               </Button>
               <ContextMenu offsetBar setShowPopper={setShowPopper} songData={currentSong}>
                  <Button
                     className={cx('mx-[2px] hover:bg-alpha-color', showPopper && 'bg-alpha-color')}
                     tippyContent="Xem thêm"
                  >
                     <More size={15} />
                  </Button>
               </ContextMenu>
            </div>
         )}
      </div>
   );
};

export default Media;
