import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Button, CustomScrollbar } from '../Commons';
import { currentSongSelector } from '~/redux/selector';

interface LyricModalProps {
   hide: () => any;
}

const LyricModal: React.FC<LyricModalProps> = ({ hide }) => {
   const currentSong = useSelector(currentSongSelector);

   const [isClose, setIsClose] = useState<boolean>(false);

   const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      if (id === 'lyric-modal' && isClose) hide();
   };

   return (
      <div
         id="lyric-modal"
         onMouseDown={() => setIsClose(true)}
         onMouseUp={handleClickBackdrop}
         className="fixed inset-0 bg-overlay-color z-30 f-center"
      >
         <div
            className="w-[800px] max-h-[70vh] h-full p-4 bg-primary-color rounded-lg relative flex flex-col gap-1"
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
         >
            <Button
               tippyContent="Đóng"
               className="absolute right-2 top-2 w-6 h-6 hover:bg-alpha-color"
               onClick={hide}
            >
               <IoMdClose size={18} />
            </Button>

            <div className="flex-1 flex flex-col">
               <h3 className="text-lg font-bold">Lời bài hát</h3>
               <div className="flex-1 mt-2">
                  {!currentSong?.lyric || currentSong?.lyric.toString().length <= 0 ? (
                     <h3 className="w-full h-full text-title-color font-medium italic f-center">
                        Không có lời bài hát
                     </h3>
                  ) : (
                     <CustomScrollbar>
                        <div className="flex flex-col">
                           <p
                              dangerouslySetInnerHTML={{ __html: currentSong?.lyric }}
                              className="text-title-color italic text-justify"
                           />
                        </div>
                     </CustomScrollbar>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default LyricModal;
