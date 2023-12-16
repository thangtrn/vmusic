import React from 'react';
import { Line } from '../Commons';
import { useSelector } from 'react-redux';
import { youtubeSelector } from '~/redux/selector';
import { useDispatch } from 'react-redux';
import { YtbMediaItem } from '.';
import { clearHistoryYtb } from '~/redux/slices/youtubeSlice';

interface YtbSearchListProps {}

const YtbSearchList: React.FC<YtbSearchListProps> = () => {
   const dispatch = useDispatch();
   const { result, history } = useSelector(youtubeSelector);

   return (
      <div className="absolute bg-primary-color inset-x-0 top-full shadow-search-bottom rounded-b-[20px] py-3 px-[10px]">
         <div className="overflow-y-auto max-h-search-list">
            {result && (
               <>
                  <ul>
                     <div className="fx-between text-sm px-[10px] pb-2">
                        <h3 className="font-bold">Gợi ý kết quả</h3>
                     </div>
                     {result === null ? (
                        <li className="text-xs px-[10px] text-search-color">
                           <span>Không có kết quả</span>
                        </li>
                     ) : (
                        <YtbMediaItem data={result} />
                     )}
                  </ul>
                  <Line />
               </>
            )}
            <ul>
               <div className="fx-between text-sm px-[10px] pb-2">
                  <h3 className="font-bold">Tìm kiếm gần đây</h3>
                  <button
                     onClick={() => dispatch(clearHistoryYtb())}
                     className="text-xs text-purple-color capitalize"
                  >
                     Xoá
                  </button>
               </div>
               {history.length <= 0 && (
                  <li className="text-xs px-[10px] text-search-color">
                     <span>Không có lịch sử tìm kiếm</span>
                  </li>
               )}
               {history.map((item, index) => (
                  <YtbMediaItem data={item} key={index} />
               ))}
            </ul>
         </div>
      </div>
   );
};

export default YtbSearchList;
