import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import cx from 'classnames';

interface ButtonProps {
   tippyContent?: string;
   className?: string;
   children?: React.ReactNode;
   onClick?: (e: React.MouseEvent<HTMLElement>) => void;
   onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void;
   onMouseUp?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         children,
         tippyContent,
         className,
         onClick = () => {},
         onMouseDown = () => {},
         onMouseUp = () => {},
      }: ButtonProps,
      ref: React.Ref<HTMLButtonElement>,
   ) => {
      let TippyComponent: any = React.Fragment;
      const tippySetting: ITippySetting = {};

      if (tippyContent) {
         TippyComponent = Tippy;
         tippySetting.content = <span className="text-[11px]">{tippyContent}</span>;
         tippySetting.placement = 'top';
         tippySetting.arrow = true;
         tippySetting.duration = 300;
         tippySetting.delay = [75, 0];
      }

      return (
         <TippyComponent {...tippySetting}>
            <button
               ref={ref}
               onClick={onClick}
               onMouseDown={onMouseDown}
               onMouseUp={onMouseUp}
               className={cx('f-center rounded-full w-8 h-8', className)}
            >
               {children}
            </button>
         </TippyComponent>
      );
   },
);

export default Button;
