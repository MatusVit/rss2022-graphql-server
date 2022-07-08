export interface TrackFromApi {
  _id: string;
  title: string;
  albumId: string;
  artistsIds: string[];
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

export interface Track {
  id: string;
  title: string;
  album: string;
  artists: string[];
  bands: string[];
  duration: number;
  released: number;
  genres: string[];
}
