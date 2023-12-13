import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from './Image';
import { Line } from '../Commons';

const Hero: React.FC = () => {
   return (
      <div>
         <Skeleton className="w-full" height={208} />
         <div className="flex items-center px-8 relative z-10">
            <div className="absolute bottom-0">
               <div className="w-44 h-44 p-1 bg-white rounded-full overflow-hidden shadow-media">
                  <Image circle />
               </div>
            </div>
            <div className="w-44" />
            <div className="flex-1 mt-8 mb-4 ml-4">
               <Skeleton className="w-56" />
               <Skeleton className="w-40" />
            </div>
         </div>
         <Line className="mt-8" />
      </div>
   );
};

export default Hero;
