import React from 'react';
import Skeleton from 'react-loading-skeleton';

const MediaLong: React.FC = () => {
   return (
      <div className="fy-center">
         <Skeleton className="w-[52px] h-[52px]" />
         <div className="w-full ml-[10px] fx-between">
            <div className="w-80">
               <Skeleton />
               <Skeleton className="w-2/3" />
            </div>
            <Skeleton width={30} />
            <div className="w-1/4 flex justify-end items-center gap-2">
               <Skeleton width={30} />
               <Skeleton width={30} />
               <Skeleton width={30} />
            </div>
         </div>
      </div>
   );
};

export default MediaLong;
