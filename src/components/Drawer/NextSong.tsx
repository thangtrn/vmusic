import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { musicSelector } from '~/redux/selector';

const NextSong: React.FC = () => {
   const { title, playlistId } = useSelector(musicSelector);
   return (
      <div className="px-2 pt-[15px] pb-[5px] text-sm">
         <h3 className="font-bold">Tiếp theo</h3>
         <h3 className="flex text-subtitle-color font-normal">
            <span>Từ playlist</span>
            <Link
               to={`/album/${playlistId}`}
               className="line-clamp-1 flex-1 ml-[5px] font-medium text-hover text-progressbar-active"
            >
               {title}
            </Link>
         </h3>
      </div>
   );
};

export default NextSong;
