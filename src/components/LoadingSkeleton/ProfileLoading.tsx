import React from 'react';
import Hero from './Hero';
import { MediaLong } from './Media';
import Skeleton from 'react-loading-skeleton';

const ProfileLoading: React.FC = () => {
   return (
      <div>
         <Hero />
         <Skeleton className="mb-5" height={18} />
         <div className="flex flex-col gap-3">
            {Array(10)
               .fill(0)
               .map((_, index) => (
                  <MediaLong key={index} />
               ))}
         </div>
      </div>
   );
};

export default ProfileLoading;
