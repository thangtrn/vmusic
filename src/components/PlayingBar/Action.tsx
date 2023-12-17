import React, { memo } from 'react';
import cx from 'classnames';
import usePortal from 'react-cool-portal';
import { useDispatch, useSelector } from 'react-redux';
import { audioSelector, musicSelector } from '~/redux/selector';
import { setVolume, toggleVolume } from '~/redux/slices/audioSlice';
import { setShowPlaylist } from '~/redux/slices/musicSlice';
import InputRange from './InputRange';
import { Button } from '../Commons';
import { Microphone2, VolumeHigh, VolumeCross, MusicFilter, Message } from 'iconsax-react';
import { CommentModal } from '../Comment';
import { useLocation } from 'react-router-dom';
import { LyricModal } from '../Lyric';

const Action: React.FC = memo(() => {
   const location = useLocation();
   const dispatch = useDispatch();
   const { showPlaylist } = useSelector(musicSelector);
   const { volume } = useSelector(audioSelector);

   const { Portal, toggle, hide } = usePortal({ defaultShow: false });
   const {
      Portal: LyricPortal,
      toggle: lyricToggle,
      hide: lyricHide,
   } = usePortal({ defaultShow: false });

   const handleChangeVolume = (values: number) => {
      const volumeValue = Math.floor(values);
      dispatch(setVolume(volumeValue));
   };

   const handleToggleShowAlbum = () => {
      dispatch(setShowPlaylist());
   };

   return (
      <div className="w-[30%] fy-center justify-end">
         <div
            className="fy-center"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
         >
            {!location.pathname.startsWith('/playlist') && (
               <>
                  <Button
                     onClick={toggle}
                     tippyContent="Bình luận"
                     className="mx-[2px] hover:bg-alpha-color"
                  >
                     <Message size={16} />
                  </Button>

                  <Portal>
                     <CommentModal hide={hide} />
                  </Portal>
               </>
            )}

            <Button
               onClick={lyricToggle}
               tippyContent="Xem lời bài hát"
               className="mx-[2px] hover:bg-alpha-color"
            >
               <Microphone2 size={16} />
            </Button>

            <LyricPortal>
               <LyricModal hide={lyricHide} />
            </LyricPortal>

            <div className="fy-center group">
               <Button
                  onClick={() => dispatch(toggleVolume())}
                  className="flex-shrink-0 mx-[2px] group-hover:bg-alpha-color"
               >
                  {volume === 0 ? <VolumeCross size={16} /> : <VolumeHigh size={16} />}
               </Button>
               <InputRange
                  step={0.01}
                  value={volume}
                  onChange={handleChangeVolume}
                  className="!w-[70px]"
               />
            </div>

            <div className="f-center flex-grow-0 flex-shrink-0">
               <span className="h-[33px] w-[1px] bg-border-color mx-5" />
            </div>

            <Button
               onClick={handleToggleShowAlbum}
               tippyContent="Danh sách bài hát"
               className={cx(
                  '!w-7 h-[30px] !rounded',
                  showPlaylist
                     ? 'bg-progressbar-active text-primary-color'
                     : 'hover:bg-alpha-color',
               )}
            >
               <MusicFilter size={16} />
            </Button>
         </div>
      </div>
   );
});

export default Action;
