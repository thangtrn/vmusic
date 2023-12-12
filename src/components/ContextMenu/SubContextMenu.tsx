import React from 'react';
import { MusicPlaylist } from 'iconsax-react';
import { toast } from 'react-toastify';
import { musicApi } from '~/axios';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

interface SubContextMenuProps {
   data: ISong;
}

const SubContextMenu: React.FC<SubContextMenuProps> = ({ data }) => {
   const { playlists } = useSelector(userSelector);

   const handleAddPlaylist = async (playlist: IAlbum) => {
      try {
         const findIndex = playlist.songs.findIndex((item) => item?.id === data?.id);
         if (findIndex !== -1) {
            toast.warning('Bài hát đã có trong playlist của bạn');
            return;
         }
         await musicApi.addSongToPlaylist(playlist?.id, data?.id);
         toast.success('Thêm thành công');
      } catch (error) {
         console.log(error);
         toast.error('Đã có lỗi');
      }
   };

   return (
      <ul className="py-[10px] shadow-menu-context bg-primary-color rounded-lg w-[250px]">
         <h3 className="text-sm px-5 font-medium mb-2">Playlist của bạn</h3>
         {playlists.length <= 0 && (
            <span className="py-[10px] px-5 text-xs leading-normal italic text-subtitle-color mt-[1px] line-clamp-1">
               Chưa có playlist nào
            </span>
         )}
         {playlists.map((item) => (
            <li className="hover:bg-alpha-color hover:text-purple-color" key={item?.id}>
               <button
                  className="fy-center w-full py-[10px] px-5 text-sm"
                  onClick={() => handleAddPlaylist(item)}
               >
                  <div className="w-8">
                     <MusicPlaylist size={16} />
                  </div>
                  <span className="leading-normal">{item?.name}</span>
               </button>
            </li>
         ))}
      </ul>
   );
};

export default SubContextMenu;
