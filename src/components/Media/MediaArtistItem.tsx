import React from 'react';
import { Image } from '../Commons';
import { Link } from 'react-router-dom';

interface MediaArtistItemProps {
   data: IArtist;
}

const MediaArtistItem: React.FC<MediaArtistItemProps> = ({ data }) => {
   return (
      <Link
         to={`/artist/${data?.id}`}
         className="fy-center px-[10px] py-2 group/image hover:bg-alpha-color rounded-md"
      >
         <Image
            overlay={false}
            scale={false}
            className="w-[52px] h-[52px] mr-[10px] rounded-full"
            src={data?.image}
         />
         <div className="flex-1">
            <h4 className="line-clamp-1 text-sm font-medium leading-normal">{data?.artistName}</h4>
            <span className="line-clamp-1 text-subtitle-color text-xs mt-[3px] leading-normal">
               {data?.national}
            </span>
         </div>
      </Link>
   );
};

export default MediaArtistItem;
