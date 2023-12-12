import React from 'react';
import { durationLongTime } from '~/helpers';

import { HiSortDescending } from 'react-icons/hi';
import MediaItem from './MediaItem';

interface SongMainProps {
   data: ISong;
}
const SongMain: React.FC<SongMainProps> = ({ data }) => {
   return (
      <div className="w-full">
         <h3 className="text-subtitle-color text-sm mb-[10px] line-clamp-3 leading-normal">
            Lời tựa <span className="text-title-color font-medium">{data?.description}</span>
         </h3>

         <div className="mb-[10px]">
            {/* header */}
            <div className="h-[46px] fy-center text-xs text-subtitle-color font-medium uppercase border-b border-border-color rounded">
               <h3 className="fy-center w-1/2 mr-[10px]">
                  <HiSortDescending size={16} />
                  <span className="ml-[10px]">Bài hát</span>
               </h3>
               <div className="flex-1">
                  <span>Mô tả</span>
               </div>
               <div>
                  <span className="text-right">Thời gian</span>
               </div>
            </div>
            {/* listSong */}
            <div>
               <MediaItem data={data} key={data?.id} />
            </div>
         </div>

         <h4 className="text-xs text-subtitle-color leading-normal">
            <span className="mr-2">1 bài hát</span>•
            <span className="ml-2">{durationLongTime(data?.songTime)}</span>
         </h4>
      </div>
   );
};

export default SongMain;
