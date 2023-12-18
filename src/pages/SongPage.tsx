import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { musicApi } from '~/axios';
import { AlbumLoading, NotFound } from '~/components/LoadingSkeleton';
import { SongHeader, SongMain } from '~/components/PlaylistSection';
import { appSelector } from '~/redux/selector';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';

const SongPage: React.FC = () => {
   const { id } = useParams();
   const [songData, setsongData] = useState<ISong>();

   const dispatch = useDispatch();
   const { loading, error } = useSelector(appSelector);

   useEffect(() => {
      const fetchSongData = async () => {
         try {
            dispatch(setStartLoading());
            const res = await musicApi.fetchSongById(id!);
            if (!res?.data?.metadata) {
               dispatch(setError());
               return;
            }
            setsongData(res.data?.metadata);
            dispatch(setEndLoading());
         } catch (error) {
            console.log(error);
            dispatch(setError());
         }
      };
      fetchSongData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);
   console.log(error);

   if (loading) {
      return <AlbumLoading />;
   }
   if (error) {
      return <NotFound />;
   }

   return (
      <div className="w-full pt-10 mb-[30px] flex gap-[30px]">
         <SongHeader data={songData!} />
         <SongMain data={songData!} />
      </div>
   );
};

export default SongPage;
