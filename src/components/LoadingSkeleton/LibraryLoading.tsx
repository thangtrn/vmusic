import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { MediaLong } from './Media';
import { Carousel } from './Carousel';

const LibraryLoading: React.FC = () => {
   return (
      <div className="pb-10 flex flex-col gap-4">
         <Carousel />
         <Skeleton className="mb-5 max-w-xs mt-8" height={32} />
         {Array(10)
            .fill(0)
            .map((_, index) => (
               <MediaLong key={index} />
            ))}
      </div>
   );
};

export default LibraryLoading;
