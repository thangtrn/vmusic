import { SearchNormal1 } from 'iconsax-react';
import React, { useState } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { playIcon } from '~/assets';
import { Button, Image } from '~/components/Commons';
import { AppDispatch } from '~/redux/store';
import { musicApi } from '~/axios';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { setSingleSong } from '~/redux/slices/musicSlice';

const YoutubePage: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();

   const [pageLoading, setPageLoading] = useState<boolean>(false);
   const [url, setUrl] = useState<string>('');
   const [data, setData] = useState<any>(null);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (url.trim().length <= 0) {
         return toast.warning('Vui lòng nhập link ytb');
      }
      try {
         setPageLoading(true);
         const res = await musicApi.fetchAudioFromYtb(url);
         setData(res?.data?.metadata);
         setPageLoading(false);
      } catch (error) {
         console.log(error);
         setPageLoading(false);
         toast.error('Không tìm thấy bài hát');
      }
   };

   const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(
         setSingleSong({
            id: 'ytb',
            name: data?.audioInformation?.name || '',
            image: data?.audioInformation?.image || '',
            songUrl: data?.audioUrls[1]?.audioUrl || '',
            tag: null,
         } as ISong),
      );
   };

   return (
      <div className="mt-10 max-w-3xl mx-auto">
         <div className="w-full mb-3">
            <form className="w-full flex gap-2" onSubmit={handleSubmit}>
               <input
                  value={url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                  name="youtube"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none"
                  placeholder="Nhập link youtube"
               />
               <button
                  type="submit"
                  disabled={pageLoading}
                  className="w-14 f-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none disabled:bg-gray-400"
               >
                  {pageLoading ? (
                     <div className="f-center cursor-pointer animate-spin">
                        <AiOutlineLoading3Quarters size={16} />
                     </div>
                  ) : (
                     <SearchNormal1 size="16" />
                  )}
               </button>
            </form>
         </div>
         <div>
            {data && (
               <div className="fy-center px-[10px] py-2 group/image hover:bg-alpha-color rounded-md">
                  <Image
                     scale={false}
                     className={cx('mr-[10px] w-[52px] h-[52px]')}
                     src={data?.audioInformation?.image}
                  >
                     <Button
                        onClick={handlePlay}
                        className="w-10 h-10 f-center hover:brightness-90"
                     >
                        <img src={playIcon} alt="playIcon" className="w-full h-full object-cover" />
                     </Button>
                  </Image>
                  <div className="flex-1">
                     <h4 className="line-clamp-1 text-sm font-medium leading-normal">
                        {data?.audioInformation?.name}
                     </h4>
                     <span className="line-clamp-1 text-subtitle-color text-xs mt-[3px] leading-normal">
                        {data?.audioInformation?.artistNames}
                     </span>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default YoutubePage;
