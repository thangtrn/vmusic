import React from 'react';
import cx from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import usePortal from 'react-cool-portal';

import { Image, Button } from '~/components/Commons';
import { setPlayPause, fetchAlbum, clearPlaylistSongs } from '~/redux/slices/musicSlice';
import { musicSelector } from '~/redux/selector';
import { resizeImage } from '~/helpers';
import { AppThunkDispatch } from '~/redux/store';

import { IoMdClose } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { playIcon, musicWaveIcon, LoadingIcon } from '~/assets';
import EditPlaylistModal from './EditPlaylistModal';
import { deletePlaylist } from '~/redux/slices/userSlice';

interface PlaylistCardProps {
   className?: string;
   data: IAlbum;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ className, data }) => {
   const dispatch = useDispatch<AppThunkDispatch>();
   const navigate = useNavigate();
   const { playlistId, isPlaying, loading } = useSelector(musicSelector);

   const { Portal, toggle, hide } = usePortal({ defaultShow: false });

   const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      toggle();
   };

   const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      try {
         dispatch(deletePlaylist(data?.id));
         toast.success('Xoá thành công');
         if (data?.id === playlistId) dispatch(clearPlaylistSongs());
      } catch (error) {
         console.log(error);
         toast.error('Đã có lỗi');
      }
   };

   const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (playlistId == data?.id) dispatch(setPlayPause());
      else {
         dispatch(fetchAlbum(data?.id));
         navigate(`/playlist/${data?.id}`);
      }
   };

   return (
      <div className={cx('flex-shrink-0 min-w-[160px]', className)}>
         <Link to={`/playlist/${data?.id}`} className="relative">
            <Image
               src={data?.image && resizeImage(data?.image)}
               active={isPlaying && playlistId == data?.id}
            >
               <Button
                  onClick={handleDelete}
                  className="w-[30px] h-[30px] hover:bg-icon-hover-color"
                  tippyContent="Xoá"
               >
                  <IoMdClose size={18} />
               </Button>
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

               <Button
                  onClick={handleEdit}
                  className="w-[30px] h-[30px] hover:bg-icon-hover-color"
                  tippyContent="Xem thêm"
               >
                  <MdEdit size={18} />
               </Button>
            </Image>
         </Link>
         <div className="mt-3 text-sm leading-[1.33]">
            <Link
               to={`/playlist/${data?.id}`}
               className="line-clamp-1 leading-[1.36] text-primary font-bold mb-1 hover:text-hover-color"
            >
               {data?.name}
            </Link>
            <h3 className="line-clamp-2 text-gray-600 cursor-default">{data?.description}</h3>
         </div>
         <Portal>
            <EditPlaylistModal hide={hide} playlistData={data} />
         </Portal>
      </div>
   );
};

export default PlaylistCard;
