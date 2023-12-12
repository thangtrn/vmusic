import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from '../Image';

interface CardProps {
   circle?: boolean;
}

const Card: React.FC<CardProps> = ({ circle = false }) => {
   return (
      <div className="flex-shrink-0 min-w-[160px]">
         <Image circle={circle} />
         <div className="mt-2">
            <Skeleton />
            <Skeleton />
         </div>
      </div>
   );
};

export default Card;
