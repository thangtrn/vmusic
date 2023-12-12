import { useEffect, useState } from 'react';
import { NavigationType, useLocation, useNavigationType } from 'react-router-dom';

const useHistoryStack = () => {
   const [stack, setStack] = useState<string[]>([]);
   const [active, setActive] = useState<number>(0);

   const { pathname } = useLocation();
   const type: NavigationType = useNavigationType();

   useEffect(() => {
      if (type === NavigationType.Push) {
         // nếu stack.lengt > active thì pop stack từ vị trí active + 1 cho tới cuối stack
         // thêm pathname mới vào stack
         if (stack.length > active) {
            setStack([...stack.slice(0, active), pathname]);
            setActive(active + 1);
         }
         // ngược lại thì push pathname vào stack
         else {
            setStack([...stack, pathname]);
            setActive(active + 1);
         }
      }
      // chỉ khi pathname và type thay đổi thì mới cần gọi hàm xử lý lưu trữ stack
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathname, type]);

   return { stack, active, setActive };
};

export default useHistoryStack;
