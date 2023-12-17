import React, { useState } from 'react';
import cx from 'classnames';
import { Button, Image } from '../Commons';
import { playIcon } from '~/assets';
import { useDispatch } from 'react-redux';
import { YTB_TAG } from '~/utils';
import { setSingleSong } from '~/redux/slices/musicSlice';
import ContextMenu from './ContextMenu';
import { More } from 'iconsax-react';

interface YtbMediaItemProps {
   data: ISong;
}

const YtbMediaItem: React.FC<YtbMediaItemProps> = ({ data }) => {
   const dispatch = useDispatch();
   const [showPopper, setShowPopper] = useState<boolean>(false);

   const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(setSingleSong({ ...data, tag: YTB_TAG } as ISong));
   };

   return (
      <div
         className={cx(
            'fy-center px-[10px] py-2 group/image hover:bg-alpha-color rounded-md',
            showPopper && 'bg-alpha-color',
         )}
      >
         <Image
            active={showPopper}
            scale={false}
            className={cx('mr-[10px] w-[52px] h-[52px]')}
            src={data?.image}
         >
            <Button onClick={handlePlay} className="w-10 h-10 f-center hover:brightness-90">
               <img src={playIcon} alt="playIcon" className="w-full h-full object-cover" />
            </Button>
         </Image>
         <div className="flex-1">
            <h4 className="line-clamp-1 text-sm font-medium leading-normal">{data?.name}</h4>
            <span className="line-clamp-1 text-subtitle-color text-xs mt-[3px] leading-normal">
               {data?.artistNames}
            </span>
         </div>
         <ContextMenu setShowPopper={setShowPopper} songData={data}>
            <Button className="mx-[2px] hover:bg-alpha-color" tippyContent="Khác">
               <More size={15} />
            </Button>
         </ContextMenu>
      </div>
   );
};

export default YtbMediaItem;
