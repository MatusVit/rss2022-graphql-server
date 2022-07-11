export type User = {
  id: string;
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  favouriteArtistIds?: string[];
};

export type UserFromAPI = {
  _id: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  favouriteArtistIds?: string[];
};
