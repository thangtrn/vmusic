import React from 'react';
import { MediaLong } from './Media';
import Skeleton from 'react-loading-skeleton';

const SongRankingLoading: React.FC = () => {
   return (
      <div>
         <Skeleton className="mb-5 max-w-xs" height={42} />
         <div className="pb-10 flex flex-col gap-4">
            {Array(10)
               .fill(0)
               .map((_, index) => (
                  <MediaLong key={index} />
               ))}
         </div>
      </div>
   );
};

export default SongRankingLoading;
