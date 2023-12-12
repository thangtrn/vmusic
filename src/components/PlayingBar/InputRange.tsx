import React from 'react';
import { Range } from 'react-range';
import cx from 'classnames';

interface InputRangeProps {
   value?: number;
   step?: number;
   fixed?: number;
   className?: string;
   onChange?: (value: number) => void;
   onFinalChange?: (value: number) => void;
}

const InputRange: React.FC<InputRangeProps> = ({
   value = 0,
   step = 0.001,
   fixed = 3,
   className,
   onChange = () => {},
   onFinalChange = () => {},
}) => {
   const fixedValue = value.toFixed(fixed);

   return (
      <div className={cx('w-full h-[15px] fy-center group', className)}>
         <Range
            step={step}
            min={0}
            max={100}
            values={[parseFloat(fixedValue)]}
            onChange={(values) => onChange(values[0])}
            onFinalChange={(values) => onFinalChange(values[0])}
            renderTrack={({ props, children }) => (
               <div
                  {...props}
                  style={{
                     ...props.style,
                     backgroundImage: `linear-gradient(to right, var(--progressbar-active) 0%, var(--progressbar-active) ${fixedValue}%, var(--progressbar-player) ${fixedValue}%, var(--progressbar-player) 100%)`,
                  }}
                  className="w-full h-[3px] rounded group-hover:h-[5px]"
               >
                  {children}
               </div>
            )}
            renderThumb={({ props }) => (
               <div
                  {...props}
                  style={{
                     ...props.style,
                     cursor: 'pointer',
                  }}
                  className="w-3 h-3 invisible group-hover:visible rounded-full bg-progressbar-active outline-none"
               />
            )}
         />
      </div>
   );
};

export default InputRange;
