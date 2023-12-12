import React from 'react';
import Card from './Card';
import Skeleton from 'react-loading-skeleton';

interface CarouselProps {
   type?: 'artist' | 'album';
}

const Carousel: React.FC<CarouselProps> = ({ type = 'album' }) => {
   return (
      <div className="mt-12">
         <Skeleton className="mb-5 max-w-xs" height={28} />
         <div className="grid grid-cols-5 gap-7">
            {Array(5)
               .fill(0)
               .map((_, index) => (
                  <Card key={index} circle={type === 'artist'} />
               ))}
         </div>
      </div>
   );
};

export default Carousel;
