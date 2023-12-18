import React from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { musicSelector } from '~/redux/selector';
import { useNavigate } from 'react-router-dom';
import { clearError } from '~/redux/slices/appSlice';

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { playlistSongs } = useSelector(musicSelector);

   const handleNavigate = () => {
      navigate('/');
      dispatch(clearError());
   };

   return (
      <div
         className={cx(
            'w-full f-center',
            playlistSongs?.length <= 0 ? 'h-[calc(100vh-70px)]' : 'h-[calc(100vh-160px)]',
         )}
      >
         <div className="text-center">
            <div className="inline-flex rounded-full bg-yellow-100 p-4">
               <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                  <svg
                     className="w-16 h-16"
                     viewBox="0 0 28 28"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
               404 - Không tìm thấy nội dung
            </h1>

            <button
               onClick={handleNavigate}
               className="mt-5 text-base px-3 py-2 text-purple-color border border-purple-color rounded"
            >
               Về trang chủ
            </button>
         </div>
      </div>
   );
};

export default NotFound;
