import React, { useCallback, useRef } from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';
import { Button, SectionTitle } from '../Commons';

interface CarouselProps {
   type?: 'album' | 'artist';
   title?: string;
   carouselData: IAlbum[] | IArtist[];
}

const Carousel: React.FC<CarouselProps> = ({ type = 'album', title, carouselData }) => {
   const swiperRef = useRef<any>(null);

   const handlePrev = useCallback(() => {
      if (!swiperRef.current) return;
      swiperRef.current.swiper.slidePrev();
   }, []);

   const handleNext = useCallback(() => {
      if (!swiperRef.current) return;
      swiperRef.current.swiper.slideNext();
   }, []);

   return (
      <div className="mt-12">
         <SectionTitle title={title} />
         <div className="relative">
            <Swiper
               slidesPerView={5}
               spaceBetween={28}
               loop={carouselData.length > 5}
               modules={[Navigation]}
               ref={swiperRef}
               simulateTouch={false}
            >
               {type === 'album' ? (
                  <>
                     {(carouselData as IAlbum[])?.map((album: IAlbum) => (
                        <SwiperSlide key={album.id}>
                           <AlbumCard data={album} />
                        </SwiperSlide>
                     ))}
                  </>
               ) : (
                  <>
                     {(carouselData as IArtist[])?.map((artist: IArtist) => (
                        <SwiperSlide key={artist.id}>
                           <ArtistCard data={artist} />
                        </SwiperSlide>
                     ))}
                  </>
               )}
            </Swiper>
            {carouselData.length > 5 && (
               <>
                  <Button
                     onClick={handlePrev}
                     className="prev absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary-color shadow-primary z-10"
                  >
                     <ArrowLeft2 size="22" />
                  </Button>
                  <Button
                     onClick={handleNext}
                     className="next absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-color shadow-primary z-10"
                  >
                     <ArrowRight2 size="22" />
                  </Button>
               </>
            )}
         </div>
      </div>
   );
};

export default Carousel;
