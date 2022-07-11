export interface BandFromApi {
  _id: string;
  name: string;
  origin: string;
  members: MemberFromApi[];
  website: string;
  genresIds: string[];
}

export interface Band {
  id: string;
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genres: string[];
}

export interface MemberFromApi {
  _id: String;
  instrument: string;
  years: [string];
}

export interface Member {
  artistID: String;
  instrument: string;
  years: [string];
}
