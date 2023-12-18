import React from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import cx from 'classnames';
import { resizeImage } from '~/helpers';
import { albumDefaultImage } from '~/assets';

interface ImageProps {
   className?: string;
   children?: React.ReactNode;
   src: string;
   active?: boolean;
}

const Image: React.FC<ImageProps> = ({ children, active = false, src }) => {
   const variantBorderRadius: Variants = {
      start: {
         borderRadius: [8, 200],
         transition: {
            ease: 'easeInOut',
            duration: 0.3,
         },
      },
      end: {
         borderRadius: [200, 8],
         transition: {
            ease: 'linear',
            duration: 0.3,
            delay: 0.5,
         },
      },
   };

   const variantRotate: Variants = {
      start: {
         rotate: [0, 360],
         transition: {
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.3,
         },
      },
      end: {
         rotate: [580, 0],
         transition: {
            duration: 0.5,
            ease: 'easeIn',
         },
      },
   };

   return (
      <div className="relative bg-transparent group/image w-full h-0 pb-[100%] ">
         <AnimatePresence>
            <motion.div
               initial={false}
               animate={active ? 'start' : 'end'}
               variants={variantBorderRadius}
               className={cx(
                  'absolute inset-0 overflow-hidden shadow-media bg-alpha-color w-full h-full',
               )}
            >
               <motion.div
                  initial={active}
                  animate={active ? 'start' : 'end'}
                  variants={variantRotate}
                  className="w-full h-full"
               >
                  <img
                     className={cx(
                        'w-full h-full object-cover transition-all ease-[ease] duration-700 group-hover/image:scale-110',
                     )}
                     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.src = albumDefaultImage;
                     }}
                     src={resizeImage(src, 'w240_r1x1_jpeg')}
                     alt=""
                  />
               </motion.div>
            </motion.div>
         </AnimatePresence>
         <motion.div
            initial={false}
            animate={active ? 'start' : 'end'}
            variants={variantBorderRadius}
            className={cx(
               'absolute inset-0 bg-overlay-color',
               active ? 'hidden' : 'hidden group-hover/image:block',
            )}
         />
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
      </div>
   );
};

export default Image;
