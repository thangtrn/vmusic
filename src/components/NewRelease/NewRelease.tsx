import React, { useState } from 'react';
import { MediaItem } from '../Media';
import { SectionTitle } from '../Commons';
import { motion } from 'framer-motion';
import cx from 'classnames';

interface ITags {
   id: 'all' | 'vpop' | 'other';
   label: string;
}

const TAGS: ITags[] = [
   { id: 'all', label: 'Tất cả' },
   { id: 'vpop', label: 'Việt Nam' },
   { id: 'other', label: 'Quốc tế' },
];

interface NewReleaseProps {
   title: string;
   data: INewRelease;
}

const NewRelease: React.FC<NewReleaseProps> = ({ title, data }) => {
   const [tagActive, setTagActive] = useState<'all' | 'vpop' | 'other'>(TAGS[0].id);

   return (
      <div className="w-full mt-12">
         <SectionTitle title={title} />
         {/* <div className="mb-4 fx-between">
            <div className="flex">
               {TAGS.map((tag) => (
                  <Button
                     key={tag.id}
                     active={tag.id === tagActive}
                     onClick={() => setTagActive(tag.id)}
                  >
                     {tag.label}
                  </Button>
               ))}
            </div>
         </div> */}

         <motion.div className="fx-between flex-1 mb-4 max-w-sm p-[3px] bg-alpha-color rounded-full">
            {TAGS.map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setTagActive(tab.id)}
                  className={cx(
                     'relative f-center flex-grow flex-shrink-0 py-[5px] rounded-full',
                     tagActive === tab.id
                        ? 'text-progressbar-active font-medium'
                        : 'text-navigation-color hover:text-progressbar-active font-normal',
                  )}
               >
                  <motion.span className="relative text-xs select-none cursor-pointer z-10">
                     {tab.label}
                  </motion.span>
                  {tagActive === tab.id && (
                     <motion.div
                        layoutId="underline"
                        className="absolute inset-0 bg-primary-color rounded-full shadow-tab"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.3 }}
                     />
                  )}
               </button>
            ))}
         </motion.div>

         <div className="grid grid-cols-3 gap-x-4">
            {data[tagActive].slice(0, 12).map((item) => (
               <MediaItem
                  key={item.id}
                  data={item}
                  albumData={
                     {
                        id: item?.id, // gán tạm để tìm index bài hát
                        name: 'Mới Phát Hành',
                        songs: data[tagActive],
                     } as IAlbum
                  }
               />
            ))}
         </div>
      </div>
   );
};

export default NewRelease;
