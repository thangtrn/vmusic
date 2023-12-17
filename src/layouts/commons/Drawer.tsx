import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { musicSelector } from '~/redux/selector';
import { Header, Playlist } from '~/components/Drawer';

const TAGS: ITab[] = [
   {
      id: 1,
      label: 'Danh sách phát',
   },
   {
      id: 2,
      label: 'Lịch sử nghe',
   },
];

const Drawer: React.FC = () => {
   const { showPlaylist } = useSelector(musicSelector);
   const [activeTab, setActiveTab] = useState<number>(TAGS[0].id);

   return (
      <AnimatePresence>
         {showPlaylist && (
            <motion.div
               key="drawer"
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%', opacity: 1 }}
               transition={{ ease: 'easeInOut', duration: 0.5 }}
               className="fixed top-0 right-0 bg-primary-color shadow-drawer z-30"
            >
               <div className="w-[330px] h-drawer flex flex-col">
                  <Header tabs={TAGS} activeTab={activeTab} setActiveTab={setActiveTab} />
                  <Playlist tab={activeTab} />
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default Drawer;
