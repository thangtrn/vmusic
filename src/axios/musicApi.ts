import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

const musicApi = {
   fetchHome: (): Promise<AxiosResponse<IResponseData<ISection[]>>> => {
      return axiosInstance.get<IResponseData>('/home');
   },

   // search
   fetchSearchSuggestion: (query: string): Promise<AxiosResponse<IResponseData<ISection[]>>> => {
      return axiosInstance.get<IResponseData>('/search', {
         params: { query, pageNumber: 1, pageSize: 10 },
      });
   },
   fetchSearch: (
      query: string | null,
      type: string | null,
   ): Promise<AxiosResponse<IResponseData<ISection[]>>> => {
      const params: any = {
         query,
         type,
      };

      if (!type) {
         params.pageNumber = 1;
         params.pageSize = 12;
      }

      return axiosInstance.get<IResponseData>('/search', {
         params,
      });
   },

   // album
   fetchAlbumById: (albumId: string): Promise<AxiosResponse<IResponseData<IAlbum>>> => {
      return axiosInstance.get<IResponseData>(`/album/${albumId}`);
   },
   fetchAlbumSuggestion: (albumId: string): Promise<AxiosResponse<IResponseData<ISection[]>>> => {
      return axiosInstance.get<IResponseData>(`/album/suggestion/${albumId}`);
   },
   fetchAlbumSong: (albumId: string): Promise<AxiosResponse<IResponseData<IAlbum>>> => {
      return axiosInstance.get<IResponseData>(`/album/${albumId}`);
   },
   fetchSongById: (songId: string): Promise<AxiosResponse<IResponseData<ISong>>> => {
      return axiosInstance.get<IResponseData>(`/song/${songId}`);
   },

   // playlist
   fetchPlaylistById: (playlistId: string): Promise<AxiosResponse<IResponseData<IAlbum>>> => {
      return axiosInstance.get<IResponseData>(`/playlist/playlist-id/${playlistId}`);
   },
   fetchPlaylistByUser: (userId: string): Promise<AxiosResponse<IResponseData<IAlbum[]>>> => {
      return axiosInstance.get<IResponseData>(`/playlist/user-id/${userId}`);
   },
   createPlaylist: (
      userId: string,
      name: string,
      description: string,
   ): Promise<AxiosResponse<IResponseData<IAlbum>>> => {
      return axiosInstance.post<IResponseData>(`/playlist/create/${userId}`, {
         name,
         description,
         image: 'https://photo-zmp3.zmdcdn.me/album_default.png',
      });
   },
   editPlaylist: (
      playlistId: string,
      name: string,
      description: string,
   ): Promise<AxiosResponse<IResponseData<IAlbum>>> => {
      return axiosInstance.put<IResponseData>(`/playlist/update/${playlistId}`, {
         name,
         description,
         image: 'https://photo-zmp3.zmdcdn.me/album_default.png',
      });
   },
   deletePlaylist: (playlistId: string): Promise<AxiosResponse<IResponseData>> => {
      return axiosInstance.delete<IResponseData>(`/playlist/delete/${playlistId}`);
   },
   addSongToPlaylist: (
      playlistId: string,
      songId: string,
   ): Promise<AxiosResponse<IResponseData>> => {
      return axiosInstance.post<IResponseData>(`/playlist/add-songs/${playlistId}`, [songId]);
   },

   // song
   removeSongFromPlaylist: (
      playlistId: string,
      songId: string,
   ): Promise<AxiosResponse<IResponseData>> => {
      return axiosInstance.post<IResponseData>(`/playlist/remove-songs/${playlistId}`, [songId]);
   },

   // comment
   fetchComment: (songId: string): Promise<AxiosResponse<IResponseData<IComment[]>>> => {
      return axiosInstance.get<IResponseData>(`/comment/song-id/${songId}`);
   },
   createComment: ({
      userId,
      songId,
      content,
   }: {
      userId: string;
      songId: string;
      content: string;
   }): Promise<AxiosResponse<IResponseData<IComment>>> => {
      return axiosInstance.post<IResponseData>(`/user/comment-song`, { userId, songId, content });
   },

   getFavoriteByUser: (userId: string): Promise<AxiosResponse<IResponseData<ISong[]>>> => {
      return axiosInstance.get<IResponseData>(`/user/fav-song?userId=${userId}`);
   },
   likeSong: ({
      userId,
      songId,
   }: {
      userId: string;
      songId: string;
   }): Promise<AxiosResponse<IResponseData<ISong[]>>> => {
      return axiosInstance.post<IResponseData>(`/user/fav-song?userId=${userId}&songId=${songId}`);
   },
   unLikeSong: ({
      userId,
      songId,
   }: {
      userId: string;
      songId: string;
   }): Promise<AxiosResponse<IResponseData<ISong[]>>> => {
      return axiosInstance.delete<IResponseData>(
         `/user/fav-song?userId=${userId}&songId=${songId}`,
      );
   },

   // artist
   fetchArtist: (artistId: string): Promise<AxiosResponse<IResponseData<ISection[]>>> => {
      return axiosInstance.get<IResponseData>(`/artist/${artistId}`);
   },

   fetchTopDownload: (
      pageNumber?: number,
      pageSize?: number,
   ): Promise<AxiosResponse<IResponseData<ISong[]>>> => {
      return axiosInstance.get<IResponseData>(`/song/top-downloads`, {
         params: {
            pageNumber: pageNumber || -1,
            pageSize: pageSize || -1,
         },
      });
   },
   fetchTopListens: (
      pageNumber?: number,
      pageSize?: number,
   ): Promise<AxiosResponse<IResponseData<ISong[]>>> => {
      return axiosInstance.get<IResponseData>(`/song/top-listens`, {
         params: {
            pageNumber: pageNumber || -1,
            pageSize: pageSize || -1,
         },
      });
   },

   updateListens: (songId: string): Promise<AxiosResponse<IResponseData<ISong>>> => {
      return axiosInstance.put<IResponseData>(`/song/listens/${songId}`);
   },
   updateDownload: (songId: string): Promise<AxiosResponse<IResponseData<ISong>>> => {
      return axiosInstance.put<IResponseData>(`/song/downloads/${songId}`);
   },

   login: (username: string, password: string): Promise<AxiosResponse<IResponseData<IUser>>> => {
      return axiosInstance.put<IResponseData>(`/user/login`, { username, password });
   },

   register: (payload: IRegister): Promise<AxiosResponse<IResponseData<IUser>>> => {
      return axiosInstance.put<IResponseData>(`/user/register`, payload);
   },
};

export default musicApi;
