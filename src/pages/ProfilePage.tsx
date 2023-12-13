import { Edit } from 'iconsax-react';
import React from 'react';
import usePortal from 'react-cool-portal';
import { useSelector } from 'react-redux';
import { Line } from '~/components/Commons';
import { EditProfileModal } from '~/components/Profile';
import { PlaylistMain } from '~/components/PlaylistSection';
import { convertShortDate } from '~/helpers';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST_MESSAGE } from '~/utils';
import { ProfileLoading } from '~/components/LoadingSkeleton';

const ProfilePage: React.FC = () => {
   const { birthDay, favorites, gender, image, name, loading } = useSelector(userSelector);
   const isLogin = useSelector(isLoginSelector);

   const { Portal, toggle, hide } = usePortal({ defaultShow: false });

   if (!isLogin) {
      toast.warning(TOAST_MESSAGE.loginRequired);
      return <Navigate to="/" />;
   }

   if (loading) {
      return <ProfileLoading />;
   }

   return (
      <div className="my-10">
         <div className="w-full h-52 rounded-lg overflow-hidden">
            <img
               src="https://source.unsplash.com/random"
               className="w-full h-full object-cover"
               alt=""
            />
         </div>

         <div className="flex items-center px-8 relative">
            <div className="absolute bottom-0">
               <div className="w-44 h-44 p-1 bg-white rounded-full overflow-hidden shadow-media">
                  <div className="w-full h-full rounded-full overflow-hidden">
                     <img className="w-full h-full object-cover" src={image} alt="" />
                  </div>
               </div>
            </div>

            <div className="w-44 mr-4" />
            <div className="flex-1 mt-8 mb-4">
               <h1 className="text-3xl font-bold">{name}</h1>
               <div className="mt-1 text-sm text-subtitle-color">
                  {gender} {birthDay && '- ' + convertShortDate(birthDay! as Date)}
               </div>
            </div>
            <div className="items-end">
               <button
                  onClick={toggle}
                  className="fy-center h-8 px-3 text-sm bg-purple-color text-primary-color rounded-lg hover:brightness-75"
               >
                  <span className="w-6">
                     <Edit size={16} />
                  </span>
                  Chỉnh sửa
               </button>
            </div>
         </div>

         <Line className="my-6" />

         <PlaylistMain title="Các bài hát đã thích" data={{ songs: favorites } as IAlbum} />

         <Portal>
            <EditProfileModal hide={hide} />
         </Portal>
      </div>
   );
};

export default ProfilePage;
