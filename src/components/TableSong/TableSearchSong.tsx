import React from 'react';
import { SectionTitle } from '../Commons';
import { MediaItem } from '../Media';
import { useLocation } from 'react-router-dom';

interface TableSearchSongProps {
   title?: string;
   data: ISong[];
   showMore?: boolean;
}
const TableSearchSong: React.FC<TableSearchSongProps> = ({ title, data, showMore = true }) => {
   const location = useLocation();
   const searchQuery = new URLSearchParams(location.search).get('query');

   return (
      <div className="mt-12">
         <SectionTitle
            title={title}
            link={!showMore ? undefined : `/search/song?type=1&query=${searchQuery}`}
         />
         <ul className="grid grid-cols-2 gap-x-6">
            {data?.map((song) => (
               <li key={song?.id} className="border-b border-[rgb(0 0 0 / 5%)]">
                  <MediaItem
                     data={song}
                     imageClasName="w-10 h-10"
                     className="!p-[10px]"
                     songTime={song.songTime}
                  />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default TableSearchSong;
