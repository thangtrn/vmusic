import React from 'react';
import cx from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Button } from '~/components/Commons';
import { Shuffle } from 'iconsax-react';

interface ArtistCardProps {
   className?: string;
   data: IArtist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ className, data }) => {
   const navigate = useNavigate();

   const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      navigate(`/artist/${data?.id}`);
   };
   return (
      <div className={cx('flex-shrink-0 min-w-[160px]', className)}>
         <Link to={`/artist/${data?.id}`} className="relative">
            <Image className="rounded-full" src={data?.image}>
               <Button
                  onClick={handleClick}
                  className="w-[45px] h-[45px] rounded-full border-primary-color border f-center hover:brightness-90"
               >
                  <Shuffle />
               </Button>
            </Image>
         </Link>
         <div className="mt-3 text-sm leading-[1.33] text-center">
            <Link
               to={`/artist/${data?.id}`}
               className="line-clamp-1 leading-[1.36] text-primary font-medium mb-1 hover:text-hover-color"
            >
               {data?.artistName}
            </Link>
         </div>
      </div>
   );
};

export default ArtistCard;
