import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { musicApi } from '~/axios';
import { Carousel } from '~/components/Carousel';
import { AlbumLoading, NotFound } from '~/components/LoadingSkeleton';
import { PlaylistHeader, PlaylistMain } from '~/components/PlaylistSection';
import { appSelector } from '~/redux/selector';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';

const AlbumPage: React.FC = () => {
   const { id } = useParams();

   const dispatch = useDispatch();
   const { loading, error } = useSelector(appSelector);

   const [albumData, setAlbumData] = useState<IAlbum>();
   const [suggestionData, setSuggestionData] = useState<ISection[]>([]);

   useEffect(() => {
      const fetchAlbumData = async () => {
         try {
            dispatch(setStartLoading());
            const resAlbum = await musicApi.fetchAlbumById(id!);

            if (!resAlbum.data?.metadata) {
               dispatch(setError());
               return;
            }

            const resSuggestion = await musicApi.fetchAlbumSuggestion(id!);

            setAlbumData(resAlbum.data?.metadata);
            setSuggestionData(resSuggestion.data?.metadata);
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
         {suggestionData.map((item: ISection, index) => {
            switch (item.sectionType) {
               case 'album':
                  return (
                     <Carousel
                        key={index}
                        title={item.search}
                        carouselData={item.items as IAlbum[]}
                     />
                  );
               case 'artist':
                  return (
                     <Carousel
                        key={index}
                        title={item.search}
                        carouselData={item.items as IArtist[]}
                        type="artist"
                     />
                  );
               default:
                  return null;
            }
         })}
      </div>
   );
};

export default AlbumPage;
