import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { MainLayout } from '~/layouts';
import {
   AlbumPage,
   HomePage,
   SongPage,
   SearchPage,
   LibraryPage,
   PlaylistPage,
   ArtistPage,
   ProfilePage,
   TopDownloadPage,
   TopListenPage,
   YoutubePage,
   TopFavorites,
} from '~/pages';

const App = () => {
   return (
      <>
         <ToastContainer position="bottom-left" autoClose={1000} className="toast-position" />
         <Routes>
            <Route path="/" element={<MainLayout />}>
               <Route path="/" element={<HomePage />} />
               <Route path="/search/:slug" element={<SearchPage />} />
               <Route path="/top-download" element={<TopDownloadPage />} />
               <Route path="/top-listen" element={<TopListenPage />} />
               <Route path="/top-favorite" element={<TopFavorites />} />
               <Route path="/album/:id" element={<AlbumPage />} />
               <Route path="/song/:id" element={<SongPage />} />
               <Route path="/library" element={<LibraryPage />} />
               <Route path="/playlist/:id" element={<PlaylistPage />} />
               <Route path="/artist/:id" element={<ArtistPage />} />
               <Route path="/profile" element={<ProfilePage />} />
               <Route path="/youtube" element={<YoutubePage />} />
               <Route path="*" element={<HomePage />} />
            </Route>
         </Routes>
      </>
   );
};

export default App;
