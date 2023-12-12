import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from '../Commons';
import Image from './Image';
import { musicSelector } from '~/redux/selector';
import { LoadingIcon, musicWaveIcon, playIcon } from '~/assets';
import { setPlayPause, setPlaylistSongs } from '~/redux/slices/musicSlice';
import { resizeImage } from '~/helpers';

import { IoPlay } from 'react-icons/io5';
import { MdOutlinePause } from 'react-icons/md';

interface AlbumCardProps {
   data: IAlbum;
}

const PlaylistHeader: React.FC<AlbumCardProps> = ({ data }) => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const { loading, isPlaying, playlistId } = useSelector(musicSelector);

   const isPlayingSong = !loading && isPlaying && playlistId === id;
   const isLoadingSong = loading && playlistId === id;

   const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (data.songs.length <= 0) return;
      if (isLoadingSong) return;
      if (id === playlistId) dispatch(setPlayPause());
      else dispatch(setPlaylistSongs(data));
   };

   return (
      <div>
         <div className="w-[300px] pb-[30px] sticky top-[110px]">
            {/* image */}
            <div className="mx-auto">
               <Image
                  className="rounded-lg shadow-media"
                  active={isPlayingSong}
                  src={resizeImage(data?.image)}
               >
                  {isLoadingSong ? (
                     <Button className="w-[40px] h-[40px] mx-[17px] border border-primary-color hover:border-purple-color hover:text-purple-color">
                        <LoadingIcon fill="white" />
                     </Button>
                  ) : (
                     <Button
                        onClick={handlePlay}
                        className="w-[45px] h-[45px] rounded-full border border-primary-color f-center hover:brightness-90"
                     >
                        {isPlayingSong ? (
                           <img
                              src={musicWaveIcon}
                              alt="playIcon"
                              className="w-2/5 h-2/5 object-cover"
                           />
                        ) : (
                           <img
                              src={playIcon}
                              alt="playIcon"
                              className="w-full h-full object-cover"
                           />
                        )}
                     </Button>
                  )}
               </Image>
            </div>

            {/* detail */}
            <div className="flex flex-col mt-3">
               <div className="text-center">
                  <h3 className="text-xl font-bold leading-[1.5] break-words">{data?.name}</h3>
                  <span className="text-subtitle-color text-xs leading-[1.75]">
                     {data?.artistNames || data?.description}
                  </span>
               </div>
               <div className="mt-4 f-center">
                  <button
                     // neu dang load thi ko cho bam
                     onClick={handlePlay}
                     className="f-center uppercase text-primary-color text-sm font-normal leading-normal py-[8.5px] px-[23.5px] rounded-full bg-purple-color border border-pubg-purple-color hover:brightness-90"
                  >
                     {playlistId !== data?.id ? (
                        <>
                           <IoPlay size={18} />
                           <span className="ml-[4px]">Phát tất cả</span>
                        </>
                     ) : (
                        <>
                           {isPlaying ? <MdOutlinePause size={18} /> : <IoPlay size={18} />}
                           <span className="ml-[4px]">
                              {isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
                           </span>
                        </>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PlaylistHeader;
