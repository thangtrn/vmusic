import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
   const [debounceValue, setDebounceValue] = useState<string>('');

   useEffect(() => {
      const unsub = setTimeout(() => {
         setDebounceValue(value);
      }, delay);

      return () => {
         clearTimeout(unsub);
      };
   }, [value, delay]);

   return debounceValue;
};

export default useDebounce;
