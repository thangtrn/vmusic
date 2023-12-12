import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

interface CustomScrollbarProps {
   children: React.ReactNode;
   onScroll?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ onScroll = () => {}, children }) => {
   return (
      <Scrollbars
         key="main-scroll"
         autoHide
         autoHideTimeout={1000}
         autoHideDuration={200}
         onScroll={onScroll}
         renderTrackHorizontal={() => <div />}
         renderTrackVertical={({ style, ...props }) => (
            <div
               {...props}
               className="absolute w-1 inset-y-[2px] right-[2px] z-30 transition-opacity ease-linear"
            ></div>
         )}
         renderThumbVertical={({ style, ...props }) => (
            <div {...props} className="relative rounded-lg bg-[rgba(0,0,0,0.2)] z-30" />
         )}
         renderView={({ style, ...props }) => (
            <div {...props} style={{ ...style, marginBottom: 0, overflowX: 'hidden' }} />
         )}
      >
         {children}
      </Scrollbars>
   );
};

export default CustomScrollbar;
