import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Action, Control, Media } from '~/components/PlayingBar';
import { currentSongSelector, musicSelector } from '~/redux/selector';

const PlayingBar = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { playlistId } = useSelector(musicSelector);
   const currentSong = useSelector(currentSongSelector);

   const handleNavigate = () => {
      const targetRoute = `/album/${playlistId}`;
      if (location.pathname === targetRoute) return;

      if (playlistId) {
         navigate(`/album/${playlistId}`);
      } else if (currentSong) {
         navigate(`/song/${currentSong?.id}`);
      }
   };

   return (
      <section
         onClick={handleNavigate}
         className="fx-between w-full h-playingbar bg-playingbar-color px-5 border-t border-border-color z-30"
      >
         <Media />
         <Control />
         <Action />
      </section>
   );
};

export default PlayingBar;
