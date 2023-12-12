import React from 'react';
import Skeleton from 'react-loading-skeleton';
interface ImageProps {
   circle?: boolean;
}
const Image: React.FC<ImageProps> = ({ circle }) => {
   return (
      <div className="relative h-0 w-full pb-[100%]">
         <Skeleton className="absolute w-full h-full" circle={circle} />
      </div>
   );
};

export default Image;
