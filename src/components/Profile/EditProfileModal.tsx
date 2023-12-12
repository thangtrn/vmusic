import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userSelector } from '~/redux/selector';
import { Button } from '../Commons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import { createPlaylist } from '~/redux/slices/userSlice';
import { Edit } from 'iconsax-react';

interface EditProfileModalProps {
   hide: () => any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ hide }) => {
   const [isClose, setIsClose] = useState<boolean>(false);
   const [value, setValues] = useState({
      name: '',
      description: '',
   });
   const dispatch = useDispatch<AppDispatch>();

   const { id, gender, image } = useSelector(userSelector);

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
            className="w-[500px] p-4 bg-primary-color rounded-lg relative"
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
         >
            <Button
               tippyContent="Đóng"
               className="absolute right-2 top-2 w-6 h-6 hover:bg-alpha-color"
               onClick={hide}
            >
               <IoMdClose size={18} />
            </Button>
            <form onSubmit={handleSubmit} className="flex flex-col">
               <h2 className="text-center font-medium text-lg mb-3">Chỉnh sửa thông tin</h2>

               <div className="fy-center gap-3">
                  <label
                     htmlFor="avatar"
                     className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group/image"
                  >
                     <img className="w-full h-full object-cover" src={image} alt="" />
                     <div
                        className={
                           'absolute inset-0 bg-overlay-color hidden items-center justify-center group-hover/image:flex text-primary-color'
                        }
                     >
                        <Edit size={32} />
                     </div>
                     <input id="avatar" type="file" className="hidden" />
                  </label>

                  <div className="flex-1 flex flex-col gap-3">
                     <input
                        value={value.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setValues({ ...value, name: e.target.value })
                        }
                        type="text"
                        required
                        placeholder="Nhập họ tên"
                        className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color"
                     />
                     <input
                        value={value.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setValues({ ...value, description: e.target.value })
                        }
                        type="date"
                        required
                        placeholder="Nhập mô tả"
                        className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color"
                     />
                     <select
                        name="gender"
                        value={gender}
                        className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color outline-none"
                        required
                        placeholder="Giới tính"
                     >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                     </select>
                     <button
                        type="submit"
                        disabled={
                           value.name.trim().length <= 0 || value.description.trim().length <= 0
                        }
                        className="w-full bg-purple-color rounded-full py-2 text-sm text-center text-primary-color uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        Chỉnh sửa
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditProfileModal;
