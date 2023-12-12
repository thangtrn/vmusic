import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { musicApi } from '~/axios';
import { ArtistHero } from '~/components/Artist';
import { Carousel } from '~/components/Carousel';
import { Line } from '~/components/Commons';
import { TableSearchSong } from '~/components/TableSong';
import { appSelector } from '~/redux/selector';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';

const ArtistPage: React.FC = () => {
   const navigate = useNavigate();
   const { id } = useParams();

   const dispatch = useDispatch();
   const { loading, error } = useSelector(appSelector);
   const [artistData, setArtistData] = useState<ISection[]>([]);

   useEffect(() => {
      const fetchArtistData = async () => {
         try {
            dispatch(setStartLoading());
            const res = await musicApi.fetchArtist(id!);
            setArtistData(res.data?.metadata);
            dispatch(setEndLoading());
         } catch (error) {
            console.log(error);
            dispatch(setError());
            navigate('/home', { replace: true });
         }
      };
      fetchArtistData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (artistData.length <= 0 || loading) {
      return 'Loading...';
   }
   if (error) {
      return 'Error...';
   }

   return (
      <div className="mb-10">
         {artistData.map((item, index) => {
            switch (item?.sectionType) {
               case 'artist':
                  return (
                     <div key={index}>
                        <ArtistHero data={item.items as IArtist} />
                        <Line className="mt-8" />
                     </div>
                  );
               case 'album':
                  if ((item.items as IAlbum[]).length <= 0) return null;
                  return (
                     <Carousel
                        title="Playlist/Album"
                        carouselData={item.items as IAlbum[]}
                        key={index}
                     />
                  );
               case 'song':
                  if ((item.items as ISong[]).length <= 0) return null;
                  return (
                     <TableSearchSong
                        key={index}
                        title="Bài hát"
                        showMore={false}
                        data={item.items as ISong[]}
                     />
                  );
               default:
                  return null;
            }
         })}
      </div>
   );
};

export default ArtistPage;
