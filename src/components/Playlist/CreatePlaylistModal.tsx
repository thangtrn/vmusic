import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userSelector } from '~/redux/selector';
import { Button } from '../Commons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import { createPlaylist } from '~/redux/slices/userSlice';

interface CreatePlaylistModalProps {
   hide: () => any;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ hide }) => {
   const [isClose, setIsClose] = useState<boolean>(false);
   const [value, setValues] = useState({
      name: '',
      description: '',
   });
   const dispatch = useDispatch<AppDispatch>();

   const { id } = useSelector(userSelector);

   const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      if (id === 'create-playlist-modal' && isClose) hide();
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         dispatch(createPlaylist({ user: id, name: value.name, description: value.description }));
         hide();
         toast.success('Tạo thành công');
      } catch (error) {
         toast.error('Đã có lỗi');
      }
   };

   return (
      <div
         id="create-playlist-modal"
         onMouseDown={() => setIsClose(true)}
         onMouseUp={handleClickBackdrop}
         className="fixed inset-0 bg-overlay-color z-30 f-center"
      >
         <div
            className="w-80 p-4 bg-primary-color rounded-lg relative"
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
         >
            <Button
               tippyContent="Đóng"
               className="absolute right-2 top-2 w-6 h-6 hover:bg-alpha-color"
               onClick={hide}
            >
               <IoMdClose size={18} />
            </Button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
               <h2 className="text-center font-medium text-lg">Tạo playlist mới</h2>
               <input
                  value={value.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setValues({ ...value, name: e.target.value })
                  }
                  type="text"
                  placeholder="Nhập tên playlist"
                  className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color"
               />
               <input
                  value={value.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setValues({ ...value, description: e.target.value })
                  }
                  type="text"
                  placeholder="Nhập mô tả"
                  className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color"
               />
               <button
                  type="submit"
                  disabled={value.name.trim().length <= 0 || value.description.trim().length <= 0}
                  className="w-full bg-purple-color rounded-full py-2 text-sm text-center text-primary-color uppercase disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  Tạo mới
               </button>
            </form>
         </div>
      </div>
   );
};

export default CreatePlaylistModal;
