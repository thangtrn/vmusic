import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { login } from '~/redux/slices/userSlice';
import { AppDispatch } from '~/redux/store';

interface LoginFormProps {
   onClose: () => void;
   toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, toggleForm }) => {
   const dispatch = useDispatch<AppDispatch>();
   const { loading } = useSelector(userSelector);
   const isLogin = useSelector(isLoginSelector);

   const [values, setValues] = useState<ILogin>({
      username: '',
      password: '',
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(login(values));
      if (isLogin) onClose();
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   return (
      <>
         <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">Đăng nhập</p>
            <p className="mt-2 text-sm leading-4 text-slate-600">
               Bạn phải đăng nhập để thực hiện hành động này.
            </p>
         </div>
         <div className="mt-7 flex flex-col gap-2">
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] disabled:cursor-not-allowed disabled:opacity-60">
               <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[18px] w-[18px] "
               />
               Tiếp tuc với GitHub
            </button>
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] disabled:cursor-not-allowed disabled:opacity-60">
               <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px] "
               />
               Tiếp tục với Google
            </button>
         </div>
         <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200" />
            Hoặc
            <div className="h-px w-full bg-slate-200" />
         </div>
         <form className="w-full" onSubmit={handleSubmit}>
            <label htmlFor="username" className="sr-only">
               Tên đăng nhập
            </label>
            <input
               name="username"
               type="text"
               value={values?.username}
               onChange={handleInputChange}
               className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#333]"
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
            <p className="mb-3 mt-2 text-sm text-gray-500">
               <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">
                  Quên mật khẩu?
               </a>
            </p>
            <button
               type="submit"
               disabled={loading}
               className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:border-red-600 disabled:bg-gray-400"
            >
               {loading && (
                  <div className="f-center cursor-pointer animate-spin mr-2">
                     <AiOutlineLoading3Quarters size={16} />
                  </div>
               )}
               Đăng nhập
            </button>
         </form>
         <div className="mt-6 text-center text-sm text-slate-600">
            Chưa có tài khoản?
            <span onClick={toggleForm} className="cursor-pointer font-medium text-[#4285f4]">
               Đăng ký
            </span>
         </div>
      </>
   );
};

export default LoginForm;
