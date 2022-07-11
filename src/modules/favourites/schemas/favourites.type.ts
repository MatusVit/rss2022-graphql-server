export interface FavoriteFromApi {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

export interface Favorite {
  id: string;
  userId: string;
  bands: string[];
  genres: string[];
  artists: string[];
  tracks: string[];
}

export enum FavoriteType {
  bands = 'bands',
  genres = 'genres',
  artists = 'artists',
  tracks = 'tracks',
}
