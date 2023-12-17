import { SearchNormal1 } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { youtubeSelector } from '~/redux/selector';
import { useOutSide } from '~/hooks';
import { setValueYtb, clearSearchYtb, fetchSearchYtb } from '~/redux/slices/youtubeSlice';
import { AppThunkDispatch } from '~/redux/store';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { YtbSearchList } from '~/components/Youtube';
import { toast } from 'react-toastify';

const YoutubePage: React.FC = () => {
   const dispatch = useDispatch<AppThunkDispatch>();
   const { value, loading } = useSelector(youtubeSelector);

   const focusRef = useRef<HTMLDivElement>(null);
   const [isFocus, setIsFocus] = useState<boolean>(false);

   useOutSide(focusRef, () => setIsFocus(false));

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value.trim().length <= 0) {
         return toast.warning('Vui lòng nhập link youtube');
      }
      dispatch(fetchSearchYtb());
   };

   return (
      <div className="mt-10 pb-10 max-w-3xl mx-auto">
         <div
            ref={focusRef}
            className={cx(
               'relative w-full shadow-search-top ',
               isFocus ? 'bg-primary-color rounded-t-[20px]' : 'rounded-[20px]',
            )}
         >
            <form className="flex h-10" onSubmit={handleSubmit}>
               <button type="submit" className="w-10 f-center">
                  <SearchNormal1 size="20" />
               </button>
               <input
                  type="text"
                  spellCheck="false"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     dispatch(setValueYtb(e.target.value))
                  }
                  onFocus={() => setIsFocus(true)}
                  className="flex-1 py-[5px] text-sm bg-transparent font-normal text-search-color"
                  placeholder="Nhập link youtube"
               />
               {value.length > 0 && (
                  <>
                     {loading === true ? (
                        <div className="f-center h-10 w-10 cursor-pointer animate-spin">
                           <AiOutlineLoading3Quarters size={16} />
                        </div>
                     ) : (
                        <button
                           onClick={() => dispatch(clearSearchYtb())}
                           className="f-center h-10 w-10 cursor-pointer"
                        >
                           <IoCloseOutline color="var(--text-placeholder)" size={20} />
                        </button>
                     )}
                  </>
               )}
            </form>
            {isFocus && <YtbSearchList />}
         </div>
      </div>
   );
};

export default YoutubePage;
