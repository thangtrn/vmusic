import React, { useState } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, More } from 'iconsax-react';
import { toast } from 'react-toastify';

import { Button, Image } from '../Commons';
import { LoadingIcon, musicWaveIcon, playIcon } from '~/assets';
import { setPlayPause, setNewReleaseSongs, setSingleSong } from '~/redux/slices/musicSlice';
import {
   currentSongSelector,
   favoritesSelector,
   isLoginSelector,
   musicSelector,
} from '~/redux/selector';
import { durationTime } from '~/helpers';
import { ContextMenu } from '../ContextMenu';
import { likeSong, unLikeSong } from '~/redux/slices/userSlice';
import { AppDispatch } from '~/redux/store';
import { TOAST_MESSAGE } from '~/utils';

interface MediaItemProps {
   data: ISong;
   albumData?: IAlbum;
   imageClasName?: string;
   className?: string;
   songTime?: number;
}

const MediaItem: React.FC<MediaItemProps> = ({
   data,
   albumData,
   songTime,
   imageClasName,
   className,
}) => {
   const dispatch = useDispatch<AppDispatch>();
   const { isPlaying, loading } = useSelector(musicSelector);
   const isLogin = useSelector(isLoginSelector);
   const currentSong = useSelector(currentSongSelector);
   const favorites = useSelector(favoritesSelector);
   const isFavorite = favorites.includes(data?.id);

   const [showPopper, setShowPopper] = useState<boolean>(false);

   const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (isPlaying && currentSong?.id === data?.id) dispatch(setPlayPause());
      else if (albumData) {
         dispatch(setNewReleaseSongs(albumData));
      } else {
         dispatch(setSingleSong(data));
      }
   };

   const hanldeLike = () => {
      if (isLogin) {
         dispatch(likeSong(data?.id)).then(() => toast.success(TOAST_MESSAGE.likeSong));
      } else {
         toast.warning(TOAST_MESSAGE.loginRequired);
      }
   };
   const hanldeUnLike = () => {
      if (isLogin) {
         dispatch(unLikeSong(data?.id)).then(() => toast.success(TOAST_MESSAGE.unlikeSong));
      } else {
         toast.warning(TOAST_MESSAGE.loginRequired);
      }
   };

   return (
      <div
         className={cx(
            'fy-center px-[10px] py-2 group/image hover:bg-alpha-color rounded-md',
            currentSong?.id == data?.id && 'bg-alpha-color',
            showPopper && 'bg-alpha-color',
            className,
         )}
      >
         <Image
            scale={false}
            active={showPopper || currentSong?.id == data?.id}
            className={cx('mr-[10px]', imageClasName ? imageClasName : 'w-[52px] h-[52px]')}
            src={data?.image}
         >
            {loading && currentSong?.id == data?.id ? (
               <Button className="w-10 h-10 mx-[17px]">
                  <LoadingIcon fill="white" />
               </Button>
            ) : (
               <Button onClick={handlePlay} className="w-10 h-10 f-center hover:brightness-90">
                  {isPlaying && currentSong?.id == data?.id ? (
                     <img src={musicWaveIcon} alt="playIcon" className="w-2/5 h-2/5 object-cover" />
                  ) : (
                     <img src={playIcon} alt="playIcon" className="w-full h-full object-cover" />
                  )}
               </Button>
            )}
         </Image>
         <div className="flex-1">
            <h4 className="line-clamp-1 text-sm font-medium leading-normal">{data?.name}</h4>
            <span className="line-clamp-1 text-subtitle-color text-xs mt-[3px] leading-normal">
               {data?.artistNames || data?.description}
            </span>
         </div>
         {songTime && !showPopper && (
            <span className="group-hover/image:hidden text-subtitle-color text-xs w-11 f-center">
               {durationTime(songTime)}
            </span>
         )}
         <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
            className={cx(
               'items-center ml-[10px]',
               showPopper === true ? 'flex' : 'hidden group-hover/image:flex',
            )}
         >
            {isFavorite ? (
               <Button
                  onClick={hanldeUnLike}
                  className="mx-[2px] hover:bg-alpha-color text-purple-color"
                  tippyContent="Xoá khỏi thư viện"
               >
                  <Heart size={15} variant="Bold" />
               </Button>
            ) : (
               <Button
                  onClick={hanldeLike}
                  className="mx-[2px] hover:bg-alpha-color"
                  tippyContent="Thêm vào thư viện"
               >
                  <Heart size={15} />
               </Button>
            )}
            <ContextMenu setShowPopper={setShowPopper} songData={data}>
               <Button className="mx-[2px] hover:bg-alpha-color" tippyContent="Khác">
                  <More size={15} />
               </Button>
            </ContextMenu>
         </div>
      </div>
   );
};

export default MediaItem;
