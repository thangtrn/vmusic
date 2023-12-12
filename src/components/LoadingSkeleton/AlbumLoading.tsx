import React from 'react';
import { MediaLong } from './Media';
import Skeleton from 'react-loading-skeleton';
import Image from './Image';
import { Carousel } from './Carousel';

const AlbumLoading: React.FC = () => {
   return (
      <div className="pb-10 mt-10">
         <div className="flex gap-[30px]">
            <div className="w-[300px]">
               <Image />
            </div>
            <div className="flex-1">
               <Skeleton className="mb-5" height={18} />
               <div className="flex flex-col gap-3">
                  {Array(10)
                     .fill(0)
                     .map((_, index) => (
                        <MediaLong key={index} />
                     ))}
               </div>
            </div>
         </div>
         <Carousel />
         <Carousel type="artist" />
      </div>
   );
};

export default AlbumLoading;
