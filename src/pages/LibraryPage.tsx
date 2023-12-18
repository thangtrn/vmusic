import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePortal from 'react-cool-portal';
import { PlaylistCard, CreatePlaylistModal } from '~/components/Playlist';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';
import { AddCircle } from 'iconsax-react';
import { appSelector, isLoginSelector, userSelector } from '~/redux/selector';
import { fetchPlaylistByUser } from '~/redux/slices/userSlice';
import { AppDispatch } from '~/redux/store';
import { PlaylistMain } from '~/components/PlaylistSection';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST_MESSAGE } from '~/utils';
import { RiPlayMiniFill } from 'react-icons/ri';
import { setPlaylistSongs } from '~/redux/slices/musicSlice';
import { Error, LibraryLoading } from '~/components/LoadingSkeleton';

const LibraryPage: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { loading, error } = useSelector(appSelector);
   const { playlists, favorites } = useSelector(userSelector);
   const isLogin = useSelector(isLoginSelector);

   const { Portal, toggle, hide } = usePortal({ defaultShow: false });

   const fetchPlaylistData = async () => {
      if (!isLogin) return;

      try {
         dispatch(setStartLoading());
         dispatch(fetchPlaylistByUser());
         dispatch(setEndLoading());
      } catch (error) {
         console.log(error);
         dispatch(setError());
      }
   };

   const handlePlayAll = () => {
      const album = {
         id: '',
         name: '',
         songs: favorites,
      } as IAlbum;
      dispatch(setPlaylistSongs(album));
   };

   useEffect(() => {
      fetchPlaylistData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLogin]);

   if (!isLogin) {
      toast.warning(TOAST_MESSAGE.loginRequired);
      return <Navigate to="/" />;
   }

   if (loading) {
      return <LibraryLoading />;
   }
   if (error) {
      return <Error onClick={() => fetchPlaylistData()} />;
   }

   return (
      <div className="pb-10">
         <nav className="mb-7 -mx-section">
            <div className="fy-center px-section border-b border-border-color">
               <h3 className="text-2xl pr-5 border-r border-border-color text-title-color font-bold leading-normal">
                  Playlist của tôi
               </h3>
            </div>
         </nav>
         <h1 className="mb-7 fy-center text-4xl leading-normal font-bold mt-2">
            Thư viện
            <button
               onClick={handlePlayAll}
               className="rounded-full w-10 h-10 f-center bg-primary-color shadow-button ml-3"
            >
               <RiPlayMiniFill size={26} />
            </button>
         </h1>
         <div className="grid grid-cols-5 gap-7">
            <button onClick={toggle} className="relative h-0 pb-[100%]">
               <div className="absolute inset-0 f-center flex-col gap-2 border border-border-color rounded text-purple-color cursor-pointer">
                  <AddCircle size="36" />
                  <h3>Tạo playlist mới</h3>
               </div>
            </button>
            {playlists.map((album) => (
               <PlaylistCard key={album?.id} data={album} />
            ))}
         </div>

         <div className="mt-4">
            <PlaylistMain title="Các bài hát đã thích" data={{ songs: favorites } as IAlbum} />
         </div>
         <Portal>
            <CreatePlaylistModal hide={hide} />
         </Portal>
      </div>
   );
};

export default LibraryPage;
