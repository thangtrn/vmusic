import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { musicApi } from '~/axios';
import { RootState } from '../store';
import { toast } from 'react-toastify';
import { TOAST_MESSAGE } from '~/utils';

export interface IUserSlide extends IUser {
   id: string;
   name: string;
   birthDay: string | Date;
   gender: string;
   image: string;
   username: string;
   password: string;
   createdAt: Date | string;
   roleId: string;
   roleName: string;
   playlists: IAlbum[];
   favorites: ISong[];
   loading: boolean;
   updateLoading: boolean;
}

const initialState: IUserSlide = {
   id: '',
   name: '',
   gender: '',
   image: '',
   birthDay: '',
   roleId: '',
   roleName: '',
   username: '',
   password: '',
   createdAt: '',
   playlists: [],
   favorites: [],
   loading: false,
   updateLoading: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logout: () => {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPlaylistByUser.fulfilled, (state, action: PayloadAction<IAlbum[]>) => {
            state.playlists = action.payload;
            state.loading = false;
         })
         .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<ISong[]>) => {
            state.favorites = action.payload;
            state.loading = false;
         });

      builder.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
         state.id = action.payload.id || '';
         state.name = action.payload.name || '';
         state.gender = action.payload.gender || '';
         state.image = action.payload.image || '';
         state.birthDay = action.payload.birthDay || '';
         state.roleId = action.payload.roleId || '';
         state.roleName = action.payload.roleName || '';
         state.username = action.payload.username || '';
         state.password = action.payload.password || '';
         state.createdAt = action.payload.createdAt || '';

         state.loading = false;
      });

      builder.addCase(register.fulfilled, (state) => {
         state.loading = false;
      });

      builder
         .addCase(updateProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.birthDay = action.payload.birthDay;
            state.gender = action.payload.gender;

            state.updateLoading = false;
         })
         .addCase(updateProfile.pending, (state) => {
            state.updateLoading = true;
         })
         .addCase(updateProfile.rejected, (state) => {
            state.updateLoading = false;
         });

      // addMatcher using before addCase
      builder
         .addMatcher(
            isAnyOf(
               login.pending,
               register.pending,
               fetchPlaylistByUser.pending,
               fetchFavorites.pending,
            ),
            (state) => {
               state.loading = true;
            },
         )
         .addMatcher(
            isAnyOf(
               login.rejected,
               register.rejected,
               fetchPlaylistByUser.rejected,
               fetchFavorites.rejected,
            ),
            (state) => {
               state.loading = false;
            },
         );
   },
});

export const login = createAsyncThunk(
   'user/login',
   async ({ username, password }: ILogin, { rejectWithValue }) => {
      try {
         const res = await musicApi.login(username, password);
         toast.success(TOAST_MESSAGE.loginSuccess);
         return res?.data?.metadata;
      } catch (error) {
         toast.error(TOAST_MESSAGE.loginFail);
         return rejectWithValue('Đăng nhập thất bại');
      }
   },
);

export const register = createAsyncThunk(
   'user/register',
   async (payload: IRegister, { rejectWithValue }) => {
      try {
         const { onToggleForm, ...values } = payload;
         const res = await musicApi.register(values);
         toast.success(TOAST_MESSAGE.registerSuccess);

         if (onToggleForm) onToggleForm();
         return res?.data?.metadata;
      } catch (error) {
         toast.error(TOAST_MESSAGE.registerFail);
         return rejectWithValue('Đăng ký thất bại');
      }
   },
);

export const fetchPlaylistByUser = createAsyncThunk(
   'user/fetchPlaylist',
   async (_, { getState }) => {
      const state = getState() as RootState;
      const res = await musicApi.fetchPlaylistByUser(state?.user?.id);
      return res.data?.metadata;
   },
);

export const createPlaylist = createAsyncThunk(
   'user/createPlaylist',
   async (
      { user, name, description }: { user: string; name: string; description: string },
      { dispatch },
   ) => {
      const res = await musicApi.createPlaylist(user, name, description);
      dispatch(fetchPlaylistByUser());
      return res.data?.metadata;
   },
);

export const editPlaylist = createAsyncThunk(
   'user/editPlaylist',
   async (
      {
         playlsitId,
         name,
         description,
      }: {
         playlsitId: string;
         name: string;
         description: string;
      },
      { dispatch },
   ) => {
      const res = await musicApi.editPlaylist(playlsitId, name, description);
      dispatch(fetchPlaylistByUser());
      return res.data?.metadata;
   },
);

export const deletePlaylist = createAsyncThunk(
   'user/deletePlaylist',
   async (playlistId: string, { dispatch }) => {
      const res = await musicApi.deletePlaylist(playlistId);
      dispatch(fetchPlaylistByUser());
      return res.data?.metadata;
   },
);

export const fetchFavorites = createAsyncThunk('user/fetchFavorites', async (_, { getState }) => {
   const state = getState() as RootState;
   const res = await musicApi.getFavoriteByUser(state.user.id);
   return res.data.metadata;
});

export const likeSong = createAsyncThunk(
   'user/likeSong',
   async (songId: string, { getState, dispatch }) => {
      const state = getState() as RootState;
      const res = await musicApi.likeSong({ userId: state.user.id, songId });
      dispatch(fetchFavorites());
      return res.data.metadata;
   },
);

export const unLikeSong = createAsyncThunk(
   'user/unLikeSong',
   async (songId: string, { getState, dispatch }) => {
      const state = getState() as RootState;
      const res = await musicApi.unLikeSong({ userId: state.user.id, songId });
      dispatch(fetchFavorites());
      return res.data.metadata;
   },
);

export const updateProfile = createAsyncThunk(
   'user/updateProfile',
   async (payload: IProfileUpdate) => {
      const res = await musicApi.updateProfile(payload);
      return res?.data?.metadata;
   },
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
