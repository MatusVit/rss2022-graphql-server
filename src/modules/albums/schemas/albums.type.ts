export interface AlbumFromApi {
  _id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

export interface Album {
  id: string;
  name: string;
  released: number;
  artists: string[];
  bands: string[];
  tracks: string[];
  genres: string[];
  image: string;
}
