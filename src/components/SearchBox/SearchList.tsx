import React, { useMemo } from 'react';
import { MediaItem, MediaArtistItem, MediaAlbumItem } from '../Media';
import { Line } from '../Commons';
import { useSelector } from 'react-redux';
import { searchSelector } from '~/redux/selector';
import { Link } from 'react-router-dom';
import { GoHistory } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { clearHistory } from '~/redux/slices/searchSlice';

interface ISearchList {}

const SearchList: React.FC<ISearchList> = () => {
   const dispatch = useDispatch();
   const { result, history } = useSelector(searchSelector);

   const isEmty = useMemo(() => {
      let isExists = true;
      result.forEach((item) => {
         if ((item?.items as ISong[] | IAlbum[] | IArtist[]).length > 0) isExists = false;
      });

      return isExists;
   }, [result]);

   return (
      <div className="absolute bg-primary-color inset-x-0 top-full shadow-search-bottom rounded-b-[20px] py-3 px-[10px]">
         <div className="overflow-y-auto max-h-search-list">
            {result.length > 0 && (
               <>
                  <ul>
                     <div className="fx-between text-sm px-[10px] pb-2">
                        <h3 className="font-bold">Gợi ý kết quả</h3>
                     </div>
                     {isEmty && (
                        <li className="text-xs px-[10px] text-search-color">
                           <span>Không có kết quả</span>
                        </li>
                     )}
                     {result.map((section, index) => {
                        switch (section.sectionType) {
                           case 'song':
                              return (
                                 <React.Fragment key={index}>
                                    {(section.items as ISong[]).map((song) => (
                                       <li key={song.id}>
                                          <Link to={`/song/${song.id}`}>
                                             <MediaItem data={song} />
                                          </Link>
                                       </li>
                                    ))}
                                 </React.Fragment>
                              );
                           case 'album':
                              return (
                                 <React.Fragment key={index}>
                                    {(section.items as IAlbum[]).map((album) => (
                                       <li key={album.id}>
                                          <MediaAlbumItem data={album} />
                                       </li>
                                    ))}
                                 </React.Fragment>
                              );
                           case 'artist':
                              return (
                                 <React.Fragment key={index}>
                                    {(section.items as IArtist[]).map((artist) => (
                                       <li key={artist.id}>
                                          <MediaArtistItem data={artist} />
                                       </li>
                                    ))}
                                 </React.Fragment>
                              );
                           default:
                              return null;
                        }
                     })}
                  </ul>
                  <Line />
               </>
            )}
            <ul>
               <div className="fx-between text-sm px-[10px] pb-2">
                  <h3 className="font-bold">Tìm kiếm gần đây</h3>
                  <button
                     onClick={() => dispatch(clearHistory())}
                     className="text-xs text-purple-color capitalize"
                  >
                     Xoá
                  </button>
               </div>
               {history.length <= 0 && (
                  <li className="text-xs px-[10px] text-search-color">
                     <span>Không có lịch sử tìm kiếm</span>
                  </li>
               )}
               {history.map((text, index) => (
                  <li className="rounded line-clamp-1 cursor-pointer" key={index}>
                     <div className="flex items-center px-[10px] py-2 hover:bg-alpha-color hover:text-purple-color">
                        <span className="flex items-center mr-[10px] text-secondary">
                           <GoHistory />
                        </span>
                        <div className="text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-[1.5]">
                           {text}
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default SearchList;
