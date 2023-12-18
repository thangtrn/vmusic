import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { musicApi } from '~/axios';
import Carousel from '~/components/Carousel/Carousel';
import { SearchLoading } from '~/components/LoadingSkeleton';
import { TableSearchSong } from '~/components/TableSong';
import { TabItem, Tabs } from '~/components/Tabs';
import { appSelector } from '~/redux/selector';
import { setEndLoading, setError, setStartLoading } from '~/redux/slices/appSlice';

const SearchPage: React.FC = () => {
   const dispatch = useDispatch();
   const { loading } = useSelector(appSelector);

   const location = useLocation();
   const searchQuery = new URLSearchParams(location.search).get('query');
   const typeQuery = new URLSearchParams(location.search).get('type');

   const [searchData, setSearchData] = useState<ISection[]>([]);

   useEffect(() => {
      const fetchSearchData = async () => {
         try {
            dispatch(setStartLoading());
            const res = await musicApi.fetchSearch(searchQuery, typeQuery);
            setSearchData(res.data?.metadata);
            dispatch(setEndLoading());
         } catch (error) {
            console.log(error);
            dispatch(setError());
         }
      };
      fetchSearchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchQuery, typeQuery]);

   if (loading) {
      return <SearchLoading />;
   }

   return (
      <div className="pb-10">
         <nav className="mb-7 -mx-section">
            <div className="fy-center px-section border-b border-border-color">
               <h3 className="text-2xl pr-5 border-r border-border-color text-title-color font-bold leading-normal">
                  Kết Quả Tìm Kiếm
               </h3>
               <Tabs>
                  <TabItem label="Tất cả" link={`/search/all?query=${searchQuery}`} />
                  <TabItem label="Bài hát" link={`/search/song?type=1&query=${searchQuery}`} />
                  <TabItem
                     label="Playlist/Album"
                     link={`/search/album?type=2&query=${searchQuery}`}
                  />
                  <TabItem label="Nghệ sỹ" link={`/search/artist?type=3&query=${searchQuery}`} />
               </Tabs>
            </div>
         </nav>
         {searchData.map((item: ISection, index) => {
            switch (item.sectionType) {
               case 'album':
                  if ((item.items as IAlbum[]).length <= 0) return null;
                  return (
                     <Carousel
                        title="Playlist/Album"
                        carouselData={item.items as IAlbum[]}
                        key={index}
                     />
                  );
               case 'artist':
                  if ((item.items as IArtist[]).length <= 0) return null;
                  return (
                     <Carousel
                        title="Nghệ Sĩ/OA"
                        carouselData={item.items as IArtist[]}
                        key={index}
                        type="artist"
                     />
                  );
               case 'song':
                  if ((item.items as ISong[]).length <= 0) return null;
                  return (
                     <TableSearchSong key={index} title="Bài hát" data={item.items as ISong[]} />
                  );
               default:
                  return null;
            }
         })}
      </div>
   );
};

export default SearchPage;
