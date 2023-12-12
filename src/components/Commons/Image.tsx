import React from 'react';
import cx from 'classnames';
import { albumDefaultImage } from '~/assets';

interface ImageProps {
   className?: string;
   overlay?: boolean;
   children?: React.ReactNode;
   scale?: boolean;
   src: string;
   active?: boolean;
}

const Image: React.FC<ImageProps> = ({
   src,
   className,
   overlay = true,
   scale = true,
   active = false,
   children,
}) => {
   return (
      <figure
         className={cx('relative rounded overflow-hidden cursor-pointer group/image', className)}
      >
         <img
            className={cx(
               'w-full h-full object-cover transition-all ease-[ease] duration-700',
               scale && 'group-hover/image:scale-110',
            )}
            src={src}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
               e.currentTarget.src = albumDefaultImage;
            }}
            alt=""
         />
         {overlay && (
            <div
               className={cx(
                  'absolute inset-0 bg-overlay-color',
                  active ? 'block' : 'hidden group-hover/image:block',
               )}
            />
         )}
         {children && (
            <div
               className={cx(
                  'absolute inset-x-0 top-1/2 -translate-y-1/2 h-[50px] justify-evenly items-center text-primary-color',
                  active ? 'flex' : 'hidden group-hover/image:flex',
               )}
            >
               {children}
            </div>
         )}
      </figure>
   );
};

export default Image;
