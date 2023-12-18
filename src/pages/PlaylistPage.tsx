import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { musicApi } from '~/axios';
import { AlbumLoading, NotFound } from '~/components/LoadingSkeleton';
import { PlaylistHeader, PlaylistMain } from '~/components/PlaylistSection';
import { appSelector } from '~/redux/selector';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';

const PlaylistPage: React.FC = () => {
   const { id } = useParams();

   const dispatch = useDispatch();
   const { loading, error } = useSelector(appSelector);

   const [albumData, setAlbumData] = useState<IAlbum>();

   useEffect(() => {
      const fetchAlbumData = async () => {
         try {
            dispatch(setStartLoading());
            const res = await musicApi.fetchPlaylistById(id!);

            if (!res.data?.metadata) {
               dispatch(setError());
               return;
            }

            setAlbumData(res.data?.metadata);
            dispatch(setEndLoading());
         } catch (error) {
            console.log(error);
            dispatch(setError());
         }
      };
      fetchAlbumData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   if (loading) {
      return <AlbumLoading />;
   }
   if (error) {
      return <NotFound />;
   }

   return (
      <div className="pb-10">
         <div className="w-full pt-10 mb-[30px] flex gap-[30px]">
            <PlaylistHeader data={albumData!} />
            <PlaylistMain data={albumData!} />
         </div>
      </div>
   );
};

export default PlaylistPage;
