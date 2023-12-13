import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userSelector } from '~/redux/selector';
import { Button } from '../Commons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store';
import { Edit } from 'iconsax-react';
import axios from 'axios';
import { updateProfile } from '~/redux/slices/userSlice';

interface EditProfileModalProps {
   hide: () => any;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ hide }) => {
   const { id, name, image, birthDay, gender, updateLoading } = useSelector(userSelector);
   const [isClose, setIsClose] = useState<boolean>(false);
   const [values, setValues] = useState({
      name,
      image,
      birthDay,
      gender,
   });

   const imageRef = useRef<HTMLInputElement>(null);
   const [avatar, setAvatar] = useState<string>('');

   const dispatch = useDispatch<AppDispatch>();

   const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      if (id === 'create-playlist-modal' && isClose) hide();
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValues({ ...values, gender: e.currentTarget.value });
   };

   const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      if (file && file.length > 0) {
         setAvatar(URL.createObjectURL(file[0]));
      }
   };

   useEffect(() => {
      return () => {
         avatar.length > 0 && URL.revokeObjectURL(avatar);
      };
   }, [avatar]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         let imageUrl = null;
         if (avatar.length > 0) {
            const formData = new FormData();
            const file = imageRef.current?.files && imageRef.current?.files[0];
            formData.append('file', file!);
            formData.append('upload_preset', 'yyhpp353');
            const response = await axios.post(
               'https://api.cloudinary.com/v1_1/thangtrn01/image/upload',
               formData,
               {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
               },
            );
            imageUrl = response?.data?.secure_url;
         }
         dispatch(
            updateProfile({
               id: id,
               name: values?.name,
               gender: values?.gender,
               birthDay: values?.birthDay,
               image: imageUrl || values.image,
            }),
         );
         hide();
         toast.success('Sửa thành công');
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
                     <img className="w-full h-full object-cover" src={avatar || image} alt="" />
                     <div
                        className={
                           'absolute inset-0 bg-overlay-color hidden items-center justify-center group-hover/image:flex text-primary-color'
                        }
                     >
                        <Edit size={32} />
                     </div>
                     <input
                        id="avatar"
                        type="file"
                        ref={imageRef}
                        onChange={handlePreviewAvatar}
                        className="hidden"
                     />
                  </label>

                  <div className="flex-1 flex flex-col gap-3">
                     <input
                        name="name"
                        value={values?.name}
                        onChange={handleInputChange}
                        type="text"
                        required
                        placeholder="Nhập họ tên"
                        className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color"
                     />
                     <input
                        name="birthDay"
                        value={
                           values?.birthDay
                              ? new Date(values?.birthDay).toISOString().split('T')[0]
                              : ''
                        }
                        onChange={handleInputChange}
                        type="date"
                        required
                        placeholder="Ngày sinh"
                        className="h-9 w-full border border-border-color px-3 text-sm rounded-full bg-alpha-color"
                     />
                     <select
                        name="gender"
                        value={values?.gender}
                        onChange={handleSelectChange}
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
                           values?.name?.trim()?.length <= 0 ||
                           values?.birthDay.toString().length <= 0 ||
                           updateLoading
                        }
                        className="w-full bg-purple-color rounded-full py-2 text-sm text-center text-primary-color uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {updateLoading ? 'Loading...' : 'Chỉnh sửa'}
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditProfileModal;
