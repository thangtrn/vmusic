import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { register } from '~/redux/slices/userSlice';
import { AppDispatch } from '~/redux/store';

interface RegisterFormProps {
   toggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleForm }) => {
   const dispatch = useDispatch<AppDispatch>();
   const { loading } = useSelector(userSelector);

   const [values, setValues] = useState<IRegister>({
      name: '',
      username: '',
      password: '',
      gender: 'Nam',
      birthDay: '',
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(register({ ...values, onToggleForm: toggleForm }));
   };

   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValues({ ...values, gender: e.currentTarget.value });
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   return (
      <>
         <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">Đăng ký</p>
            <p className="mt-2 text-sm leading-4 text-slate-600">Đăng ký tài khoản ngay.</p>
         </div>
         <form className="mt-7 w-full" onSubmit={handleSubmit}>
            <label htmlFor="name" className="sr-only">
               Họ tên
            </label>
            <input
               name="name"
               type="text"
               value={values?.name}
               onChange={handleInputChange}
               className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#333]"
               placeholder="Họ tên"
               required
            />

            <label htmlFor="username" className="sr-only">
               Tên đăng nhập
            </label>
            <input
               name="username"
               type="text"
               value={values?.username}
               onChange={handleInputChange}
               className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#333]"
               placeholder="Tên đăng nhập"
               required
            />

            <label htmlFor="password" className="sr-only">
               Mật khẩu
            </label>
            <input
               name="password"
               type="password"
               value={values?.password}
               onChange={handleInputChange}
               className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#333]"
               placeholder="Mật khẩu"
               required
            />

            <label htmlFor="gender" className="sr-only">
               Giới tính
            </label>
            <select
               name="gender"
               value={values?.gender}
               onChange={handleSelectChange}
               className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#333]"
               required
               placeholder="Giới tính"
            >
               <option value="Nam">Nam</option>
               <option value="Nữ">Nữ</option>
            </select>

            <label htmlFor="gender" className="sr-only">
               Ngày sinh
            </label>
            <input
               name="birthDay"
               type="date"
               onChange={handleInputChange}
               className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#333]"
               placeholder="Ngày sinh"
               required
            />

            <button
               type="submit"
               disabled={loading}
               className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:border-red-600 disabled:bg-gray-400"
            >
               Đăng ký
            </button>
         </form>
         <div className="mt-6 text-center text-sm text-slate-600">
            Đã có tài khoản?
            <span onClick={toggleForm} className="cursor-pointer font-medium text-[#4285f4]">
               Đăng nhập
            </span>
         </div>
      </>
   );
};

export default RegisterForm;
