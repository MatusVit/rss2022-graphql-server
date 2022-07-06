export type Genre = {
  id?: string;
  name: string;
  description: string;
  country: string;
  year: number;
};

export type GenreFromAPI = {
  _id?: string;
  name: string;
  description: string;
  country: string;
  year: number;
};

export type DeleteAnswer = {
  acknowledged: boolean;
  deletedCount: number;
};
