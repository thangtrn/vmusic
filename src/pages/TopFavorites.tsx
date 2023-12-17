import React, { useEffect, useState } from 'react';
import { HiSortDescending } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { musicApi } from '~/axios';
import { MediaItem } from '~/components/PlaylistSection';
import { appSelector } from '~/redux/selector';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';
import { RiPlayMiniFill } from 'react-icons/ri';
import { setPlaylistSongs } from '~/redux/slices/musicSlice';
import { SongRankingLoading } from '~/components/LoadingSkeleton';

const TopFavorites: React.FC = () => {
   const dispatch = useDispatch();
   const { loading, error } = useSelector(appSelector);
   const [songs, setSongs] = useState<ISong[]>([]);

   useEffect(() => {
      const fetchTopDownload = async () => {
         try {
            dispatch(setStartLoading());
            const res = await musicApi.fetchTopFavorites(1, 100);
            setSongs(res?.data?.metadata);
            dispatch(setEndLoading());
         } catch (error) {
            console.log(error);
            dispatch(setError());
         }
      };

      fetchTopDownload();
   }, [dispatch]);

   const handlePlayAll = () => {
      const album = {
         id: '',
         name: '',
         songs: songs,
      } as IAlbum;
      dispatch(setPlaylistSongs(album));
   };

   if (loading) {
      return <SongRankingLoading />;
   }
   if (error) {
      return 'Error...';
   }

   console.log(songs);

   return (
      <div>
         <h1 className="fy-center text-4xl leading-normal font-bold mt-2">
            BXH lượt yêu thích
            <button
               onClick={handlePlayAll}
               className="rounded-full w-10 h-10 f-center bg-primary-color shadow-button ml-3"
            >
               <RiPlayMiniFill size={26} />
            </button>
         </h1>
         <div className="mb-[10px]">
            {/* header */}
            <div className="h-[46px] fy-center text-xs text-subtitle-color font-medium uppercase border-b border-border-color rounded">
               <h3 className="fy-center w-1/2 mr-[10px]">
                  <HiSortDescending size={16} />
                  <span className="ml-[10px]">Bài hát</span>
               </h3>
               <div className="flex-1">
                  <span>Yêu thích</span>
               </div>
               <div>
                  <span className="text-right">Thời gian</span>
               </div>
            </div>
            {/* listSong */}
            <div>
               {songs?.map((song, index) => (
                  <MediaItem data={song} desc={song?.favorites} key={song.id} index={index + 1} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default TopFavorites;
