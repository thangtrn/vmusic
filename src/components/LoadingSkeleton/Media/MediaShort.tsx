import React from 'react';
import Skeleton from 'react-loading-skeleton';

const MediaShort: React.FC = () => {
   return (
      <div className="fy-center">
         <Skeleton className="w-[52px] h-[52px]" />
         <div className="w-full ml-[10px]">
            <Skeleton />
            <Skeleton className="w-2/3" />
         </div>
      </div>
   );
};

export default MediaShort;
