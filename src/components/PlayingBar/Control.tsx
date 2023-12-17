import React, { memo, useEffect, useRef } from 'react';
import cx from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { audioSelector, musicSelector } from '~/redux/selector';
import { setCurrentTime, setSeek } from '~/redux/slices/audioSlice';
import { nextSong, prevSong, setLoop, setPlayPause, setShuffle } from '~/redux/slices/musicSlice';

import { Next, Previous, Repeat, Shuffle } from 'iconsax-react';
import { RiPlayMiniFill } from 'react-icons/ri';
import { MdOutlinePause } from 'react-icons/md';
import { LoadingIcon } from '~/assets';

import InputRange from './InputRange';
import { Button } from '../Commons';
import { durationTime, percentToSecond, secondToPercent } from '~/helpers';

const Control: React.FC = memo(() => {
   const dispatch = useDispatch();
   const audioRef = useRef<HTMLAudioElement | any>(null);
   const { currentTime, duration } = useSelector(audioSelector);
   const { isPlaying, loading, isShuffle, isLoop } = useSelector(musicSelector);

   // Find and binding
   useEffect(() => {
      const audioElement: HTMLAudioElement = document.getElementById(
         'audioPlayer',
      ) as HTMLAudioElement;

      audioRef.current = audioElement;
   }, []);

   const handlePlayPause = () => {
      dispatch(setPlayPause());
   };

   const handleProgressChange = (values: number) => {
      dispatch(setSeek(true));
      const second = percentToSecond(values, duration);
      dispatch(setCurrentTime(second));
   };

   const handleProgressFinalChange = (values: number) => {
      dispatch(setSeek(false));
      if (audioRef) {
         audioRef.current.currentTime = percentToSecond(values, duration);
      }
   };

   return (
      <div
         className="flex-grow max-w-[40vw]"
         onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
         <div className="f-center">
            <Button
               onClick={() => dispatch(setShuffle())}
               tippyContent="Bật phát ngẫu nhiên"
               className={cx('mx-[7px] hover:bg-alpha-color', isShuffle && 'text-purple-color')}
            >
               <Shuffle size={16} />
            </Button>
            <Button onClick={() => dispatch(prevSong())} className="mx-[7px] hover:bg-alpha-color">
               <Previous size={18} variant="Bold" />
            </Button>

            {loading ? (
               <Button className="w-[40px] h-[40px] mx-[17px] border border-black hover:border-purple-color hover:text-purple-color">
                  <LoadingIcon />
               </Button>
            ) : (
               <Button
                  onClick={handlePlayPause}
                  className="w-[40px] h-[40px] mx-[17px] border border-black hover:border-purple-color hover:text-purple-color"
               >
                  {isPlaying ? (
                     <MdOutlinePause size={22} />
                  ) : (
                     <RiPlayMiniFill size={24} className="translate-x-[1px]" />
                  )}
               </Button>
            )}

            <Button onClick={() => dispatch(nextSong())} className="mx-[7px] hover:bg-alpha-color">
               <Next size={18} variant="Bold" />
            </Button>
            <Button
               onClick={() => dispatch(setLoop())}
               tippyContent="Bật phát lại tất cả"
               className={cx('mx-[7px] hover:bg-alpha-color', isLoop && 'text-purple-color')}
            >
               <Repeat size={16} variant="Bold" />
            </Button>
         </div>

         <div className="flex items-center mb-[5px] select-none">
            <span className="min-w-[45px] text-xs text-subtitle-color font-medium mr-[10px] opacity-50 text-right">
               {durationTime(currentTime)}
            </span>

            <InputRange
               value={secondToPercent(currentTime, duration)}
               onChange={handleProgressChange}
               onFinalChange={handleProgressFinalChange}
            />

            <span className="min-w-[45px] text-xs text-subtitle-color font-medium ml-[10px]">
               {durationTime(duration)}
            </span>
         </div>
      </div>
   );
});

export default Control;
