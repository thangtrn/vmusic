import { RefObject, useEffect } from 'react';

const useOutSide = (ref: RefObject<HTMLElement>, cb: () => void) => {
   useEffect(() => {
      const handleClickOutSide = (e: MouseEvent) => {
         if (ref && ref.current && !ref.current.contains(e.target as Node)) {
            cb();
         }
      };

      document.addEventListener('mousedown', handleClickOutSide);

      return () => {
         document.removeEventListener('mousedown', handleClickOutSide);
      };
   }, [ref, cb]);
};

export default useOutSide;
