import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { MediaShort } from '../Media';

const Table: React.FC = () => {
   return (
      <div className="mt-12">
         <Skeleton className="mb-5 max-w-xs" height={28} />
         <div className="grid grid-cols-3 gap-4">
            {Array(9)
               .fill(0)
               .map((_, index) => (
                  <MediaShort key={index} />
               ))}
         </div>
      </div>
   );
};

export default Table;
