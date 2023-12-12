import React from 'react';
import cx from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Image, Button } from '~/components/Commons';
import { setPlayPause, fetchAlbum } from '~/redux/slices/musicSlice';
import { musicSelector } from '~/redux/selector';
import { resizeImage } from '~/helpers';

// import { Heart, More } from 'iconsax-react';
import { playIcon, musicWaveIcon, LoadingIcon } from '~/assets';
import { AppThunkDispatch } from '~/redux/store';

interface AlbumCardProps {
   className?: string;
   data: IAlbum;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ className, data }) => {
   const dispatch = useDispatch<AppThunkDispatch>();
   const navigate = useNavigate();
   const { playlistId, isPlaying, loading } = useSelector(musicSelector);

   // const handleClick = (e: React.MouseEvent<HTMLElement>) => {
   //    e.preventDefault();
   // };

   const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (playlistId == data?.id) dispatch(setPlayPause());
      else {
         dispatch(fetchAlbum(data.id));
         navigate(`/album/${data?.id}`);
      }
   };

   return (
      <div className={cx('flex-shrink-0 min-w-[160px]', className)}>
         <Link to={`/album/${data?.id}`} className="relative">
            <Image src={resizeImage(data?.image)} active={isPlaying && playlistId == data?.id}>
               {/* <Button
                  onClick={handleClick}
                  className="w-[30px] h-[30px] hover:bg-icon-hover-color"
                  tippyContent="Thêm vào thư viện"
               >
                  <Heart size={18} />
               </Button> */}
               {loading && playlistId == data?.id ? (
                  <Button className="w-[40px] h-[40px] mx-[17px] border border-primary-color hover:border-purple-color hover:text-purple-color">
                     <LoadingIcon fill="white" />
                  </Button>
               ) : (
                  <Button
                     onClick={handlePlay}
                     className="w-[45px] h-[45px] rounded-full border-primary-color border f-center hover:brightness-90"
                  >
                     {isPlaying && playlistId == data?.id ? (
                        <img
                           src={musicWaveIcon}
                           alt="playIcon"
                           className="w-2/5 h-2/5 object-cover"
                        />
                     ) : (
                        <img src={playIcon} alt="playIcon" className="w-full h-full object-cover" />
                     )}
                  </Button>
               )}

               {/* <Button
                  onClick={handleClick}
                  className="w-[30px] h-[30px] hover:bg-icon-hover-color"
                  tippyContent="Xem thêm"
               >
                  <More size={18} />
               </Button> */}
            </Image>
         </Link>
         <div className="mt-3 text-sm leading-[1.33]">
            <Link
               to={`/album/${data?.id}`}
               className="line-clamp-1 leading-[1.36] text-primary font-bold mb-1 hover:text-hover-color"
            >
               {data?.name}
            </Link>
            <h3 className="line-clamp-2 text-gray-600 cursor-default">{data?.description}</h3>
         </div>
      </div>
   );
};

export default AlbumCard;
