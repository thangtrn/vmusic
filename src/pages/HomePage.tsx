import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from '~/components/Carousel';
import HoneLoading from '~/components/LoadingSkeleton/HoneLoading';
import { NewRelease } from '~/components/NewRelease';
import { appSelector } from '~/redux/selector';
import { fetchHome } from '~/redux/slices/appSlice';
import { AppDispatch } from '~/redux/store';

const HomePage = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { home, loading, error } = useSelector(appSelector);

   useEffect(() => {
      if (home.length <= 0) dispatch(fetchHome());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (home.length <= 0 || loading) {
      return <HoneLoading />;
   }
   if (error) {
      return 'Error...';
   }

   return (
      <div className="pb-10">
         {home
            .slice(0)
            .reverse()
            .map((item: ISection, index) => {
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
                  case 'song':
                     return (
                        <NewRelease
                           key={index}
                           title={item.search}
                           data={item.items as INewRelease}
                        />
                     );
                  default:
                     return null;
               }
            })}
      </div>
   );
};

export default HomePage;
