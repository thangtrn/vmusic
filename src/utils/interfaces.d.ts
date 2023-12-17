interface ITippySetting {
   content?: React.ReactNode | null;
   placement?: string;
   arrow?: boolean;
   duration?: number;
   delay?: number[];
}

// ----------- DATA -------------

// response type
interface IPagination {
   currentPage: number;
   totalPage: number;
   currentEntry: number;
}

interface IResponseData<T = any> {
   statusCode: number;
   message: string;
   pagination?: IPagination;
   metadata: T;
}

// home type
interface ISection {
   sectionType: SectionType;
   viewType: string;
   search: string;
   items: IAlbum[] | IArtist[] | ISong[] | INewRelease | IArtist;
}
// album type
interface IAlbum {
   id: string;
   name: string;
   description: string;
   image: string;
   tag: string | null;
   songs: ISong[];
   artistNames: string;
}

interface IReduxAlbumProps extends IAlbum {
   songId: string;
}

// song type
interface ISong {
   id: string;
   name: string;
   description: string;
   image: string;
   songUrl: string;
   songTime: number;
   createdAt: Data;
   tag: string | null;
   artistNames: string;
   listens: number;
   comments: [];
   favorites: number;
   listens: number;
   downloads: number;
}

// artist type
interface IArtist {
   id: string;
   name: string;
   artistName: string;
   gender: string;
   birthDay?: Date;
   debutDate?: Date;
   description: string;
   image: string;
   national: string;
   tag: string;
   artistMusicVideos?: Date;
   artistSongs?: Date;
   createdAt?: Date;
   updatedAt: Date;
   deletedAt?: Date;
}

// release type
interface INewRelease {
   all: ISong[];
   vpop: ISong[];
   other: ISong[];
}
// user type
interface IUser {
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
}

// commebt type
interface IComment {
   id: string;
   userId: string;
   songId: string;
   content: string;
   createdAt?: Date | any;
   updatedAt?: Date | any;
   username: string;
   imageUser: string;
}

interface ITab {
   id: number;
   label: string;
}

// login & register

interface ILogin {
   username: string;
   password: string;
}

interface IRegister {
   username: string;
   password: string;
   name: string;
   gender: string;
   birthDay: Date | string;
   onToggleForm?: () => void;
}

interface IProfileUpdate {
   id: string;
   name: string;
   image: string;
   gender: string;
   birthDay: Date | string;
}
