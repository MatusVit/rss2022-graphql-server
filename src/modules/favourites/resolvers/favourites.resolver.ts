import { MESSAGE } from './../../../constants/messages';
import { transformTrack } from './../../tracks/resolvers/track.resolver';
import { transformArtist } from './../../artists/resolvers/artists.resolver';
import { transformGenre } from './../../genres/resolvers/genres.resolver';
import { transformBand } from './../../bands/resolvers/band.resolver';
import { FavoriteType } from '../schemas/favourites.type';
import { UserInputError } from 'apollo-server-core';

export const transformFavourites = (favouritesFromApi) => {
  const {
    _id: id,
    albumId: album,
    artistsIds: artists,
    bandsIds: bands,
    genresIds: genres,
    tracksIds: tracks,
    ...rest
  } = favouritesFromApi;
  return { id, album, artists, bands, genres, tracks, ...rest };
};

export default {
  Query: {
    favourites: async (_, __, { dataSources, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await dataSources.favouritesAPI.getAll();

      if (!favouritesFromApi) throw new UserInputError(MESSAGE.NO_FAVORITES);

      return transformFavourites(favouritesFromApi);
    },
  },

  Favourites: {
    bands: async ({ bands }, __, { dataSources }) => {
      return await Promise.all(
        bands.map(async (id) => {
          const bandFromApi = await dataSources.bandsAPI.getById(id);
          return transformBand(bandFromApi);
        })
      );
    },

    genres: async ({ genres }, __, { dataSources }) => {
      return await Promise.all(
        genres.map(async (id) => {
          const genreFromApi = await dataSources.genresAPI.getById(id);
          return transformGenre(genreFromApi);
        })
      );
    },

    artists: async ({ artists }, __, { dataSources }) => {
      return await Promise.all(
        artists.map(async (id) => {
          const artistFromApi = await dataSources.artistsAPI.getById(id);
          return transformArtist(artistFromApi);
        })
      );
    },

    tracks: async ({ tracks }, __, { dataSources }) => {
      return await Promise.all(
        tracks.map(async (id) => {
          const trackFromApi = await dataSources.tracksAPI.getById(id);
          return transformTrack(trackFromApi);
        })
      );
    },
  },

  Mutation: {
    addTrackToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putAddFavorite({
        type: FavoriteType.tracks,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    addBandToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putAddFavorite({
        type: FavoriteType.bands,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    addArtistToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putAddFavorite({
        type: FavoriteType.artists,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    addGenreToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putAddFavorite({
        type: FavoriteType.genres,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    deleteTrackToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putRemoveFavorite({
        type: FavoriteType.tracks,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    deleteBandToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putRemoveFavorite({
        type: FavoriteType.bands,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    deleteArtistToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putRemoveFavorite({
        type: FavoriteType.artists,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },

    deleteGenreToFavourites: async (_, { id }, { dataSources: { favouritesAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const favouritesFromApi = await favouritesAPI.putRemoveFavorite({
        type: FavoriteType.genres,
        id,
      });
      return transformFavourites(favouritesFromApi);
    },
  },
};
