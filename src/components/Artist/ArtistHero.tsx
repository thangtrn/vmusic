import React from 'react';
import { Line } from '../Commons';
import { convertShortDate, replaceBio } from '~/helpers';

interface ArtistHeroProps {
   data: IArtist;
}

const ArtistHero: React.FC<ArtistHeroProps> = ({ data }) => {
   return (
      <div className="">
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
                  <div className="rounded-full overflow-hidden">
                     <img className="w-full h-full object-cover" src={data?.image} alt="" />
                  </div>
               </div>
            </div>
            <div className="w-44" />
            <div className="flex-1 mt-8 mb-4 ml-4">
               <h1 className="text-3xl font-bold">{data?.artistName}</h1>
               <div className="mt-1 text-sm text-subtitle-color">{data?.name}</div>
            </div>
         </div>
         <div className="flex items-center px-8 relative">
            <div className="w-44 mr-4" />
            <div className="flex-1">
               <Line />
               <h1 className="font-bold text-title-color mb-2">Giới thiệu</h1>
               <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-subtitle-color">
                  <div>
                     <span className="font-bold text-title-color">Họ tên: </span> {data?.name}
                  </div>
                  <div>
                     <span className="font-bold text-title-color">Giới tính: </span> {data?.gender}
                  </div>
                  <div>
                     <span className="font-bold text-title-color">Ngày sinh: </span>
                     {data?.birthDay ? convertShortDate(data?.birthDay) : 'Đang cập nhật'}
                  </div>
                  <div>
                     <span className="font-bold text-title-color">Ngày ra mắt: </span>
                     {data?.debutDate ? convertShortDate(data?.debutDate) : 'Đang cập nhật'}
                  </div>
               </div>
               <div className="text-sm mt-2 text-justify text-subtitle-color">
                  <span className="font-bold text-title-color">Tiểu sử: </span>
                  {replaceBio(data?.description)}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ArtistHero;
