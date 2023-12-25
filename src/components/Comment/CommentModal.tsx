import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, CustomScrollbar } from '../Commons';
import CommentItem from './CommentItem';
import { currentSongSelector, isLoginSelector, userSelector } from '~/redux/selector';
import { musicApi } from '~/axios';
import { TOAST_MESSAGE } from '~/utils';

interface CommentModalProps {
   hide: () => any;
}

const CommentModal: React.FC<CommentModalProps> = ({ hide }) => {
   const currentSong = useSelector(currentSongSelector);
   const { id: userId } = useSelector(userSelector);
   const isLogin = useSelector(isLoginSelector);

   const [isClose, setIsClose] = useState<boolean>(false);
   const [comments, setComments] = useState<IComment[]>([]);
   const [value, setValue] = useState<string>('');

   const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      if (id === 'comment-modal' && isClose) hide();
   };

   const fetchComment = async () => {
      try {
         const res = await musicApi.fetchComment(currentSong?.id);
         setComments(res.data.metadata);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchComment();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isLogin) {
         toast.warning(TOAST_MESSAGE.loginRequired);
         return;
      }

      if (value.trim().length <= 0) return;
      try {
         await musicApi.createComment({
            userId,
            songId: currentSong?.id,
            content: value,
         });
         fetchComment();
         toast.success('Bình luận thành công');
      } catch (error) {
         toast.error('Đã có lỗi');
      }
      setValue('');
   };

   return (
      <div
         id="comment-modal"
         onMouseDown={() => setIsClose(true)}
         onMouseUp={handleClickBackdrop}
         className="fixed inset-0 bg-overlay-color z-30 f-center"
      >
         <div
            className="w-[800px] max-h-[70vh] h-full p-4 bg-primary-color rounded-lg relative flex flex-col gap-1"
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
         >
            <Button
               tippyContent="Đóng"
               className="absolute right-2 top-2 w-6 h-6 hover:bg-alpha-color"
               onClick={hide}
            >
               <IoMdClose size={18} />
            </Button>

            <div className="flex-1 flex flex-col">
               <h3 className="text-lg font-bold">Bình luận</h3>
               <div className="flex-1 mt-2">
                  {comments.length <= 0 ? (
                     <h3 className="w-full h-full text-title-color font-medium italic f-center">
                        Chưa có bình luận
                     </h3>
                  ) : (
                     <CustomScrollbar>
                        <div className="flex flex-col gap-3">
                           {comments.map((item) => (
                              <CommentItem key={item?.id} data={item} />
                           ))}
                        </div>
                     </CustomScrollbar>
                  )}
               </div>
            </div>
            <form className="relative text-sm" onSubmit={handleSubmit}>
               <input
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                  type="text"
                  className="w-full p-2 pr-24 text-sm border border-gray-300 rounded-lg bg-alpha-color focus:ring-progressbar-active focus:border-progressbar-active"
               />
               <button
                  type="submit"
                  className="text-white absolute right-2 top-1/2 -translate-y-1/2 bg-progressbar-active rounded-lg text-sm px-2 py-1"
               >
                  Bình luận
               </button>
            </form>
         </div>
      </div>
   );
};

export default CommentModal;
