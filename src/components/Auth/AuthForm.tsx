import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthFormProps {
   onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
   const [isClose, setIsClose] = useState<boolean>(false);
   const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

   const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      if (id === 'auth-popup' && isClose) onClose();
   };

   const handleToggleForm = () => {
      setActiveForm(activeForm === 'login' ? 'register' : 'login');
   };

   return (
      <div
         id="auth-popup"
         onMouseDown={() => setIsClose(true)}
         onMouseUp={handleClickBackdrop}
         tabIndex={-1}
         className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
         <div
            className="relative p-4 w-full max-w-md h-full md:h-auto"
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
         >
            <div className="relative bg-white rounded-lg shadow">
               <button
                  onClick={onClose}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
               >
                  <svg
                     aria-hidden="true"
                     className="w-5 h-5"
                     fill="#c6c7c7"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                     />
                  </svg>
                  <span className="sr-only">Close popup</span>
               </button>
               <div className="p-5">
                  <h3 className="text-2xl mb-0.5 font-medium" />
                  <p className="mb-4 text-sm font-normal text-gray-800" />

                  {activeForm === 'login' ? (
                     <LoginForm onClose={onClose} toggleForm={handleToggleForm} />
                  ) : (
                     <RegisterForm toggleForm={handleToggleForm} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthForm;
