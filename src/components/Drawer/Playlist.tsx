import React from 'react';
import { CustomScrollbar } from '../Commons';
import { useSelector } from 'react-redux';
import { currentSongSelector, musicSelector } from '~/redux/selector';
import MediaItem from './MediaItem';
import NextSong from './NextSong';

interface PlaylistProps {
   tab: number;
}

const Playlist: React.FC<PlaylistProps> = ({ tab }) => {
   const { playlistSongs, history, title, currentIndex } = useSelector(musicSelector);
   const currentSong = useSelector(currentSongSelector);

   const playlist = tab === 1 ? playlistSongs : history;

   return (
      <div className="flex-1">
         <CustomScrollbar>
            <div className="px-2">
               {playlist.map((song, index) => (
                  <React.Fragment key={song.id}>
                     <MediaItem data={song} wasListened={tab !== 2 && index < currentIndex} />
                     {index < playlist.length - 1 && title && currentSong?.id === song.id && (
                        <NextSong />
                     )}
                  </React.Fragment>
               ))}
            </div>
         </CustomScrollbar>
      </div>
   );
};

export default Playlist;
