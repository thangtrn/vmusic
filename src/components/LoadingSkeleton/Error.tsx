import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { musicSelector } from '~/redux/selector';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearError } from '~/redux/slices/appSlice';

interface ErrorProps {
   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Error: React.FC<ErrorProps> = ({ onClick }) => {
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
            <div className="inline-flex rounded-full bg-red-100 p-4">
               <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                  <svg
                     className="w-16 h-16"
                     viewBox="0 0 28 28"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     ></path>
                     <path
                        d="M17 16L22 21M22 16L17 21"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     ></path>
                  </svg>
               </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">Đã có lỗi</h1>

            {onClick ? (
               <button
                  onClick={onClick}
                  className="mt-5 text-base px-3 py-2 text-purple-color border border-purple-color rounded"
               >
                  Tải lại trang
               </button>
            ) : (
               <button
                  onClick={handleNavigate}
                  className="mt-5 text-base px-3 py-2 text-purple-color border border-purple-color rounded"
               >
                  Về trang chủ
               </button>
            )}
         </div>
      </div>
   );
};

export default Error;
