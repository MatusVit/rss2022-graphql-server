import { Album, AlbumFromApi } from './../schemas/albums.type';
import { MESSAGE } from '../../../constants/messages';
import { transformArtist } from './../../artists/resolvers/artists.resolver';
import { transformGenre } from './../../genres/resolvers/genres.resolver';
import { transformBand } from './../../bands/resolvers/band.resolver';
import { transformTrack } from './../../tracks/resolvers/track.resolver';
import { UserInputError } from 'apollo-server-core';

export const transformAlbum = (artistFromApi: AlbumFromApi): Album => {
  const {
    _id: id,
    artistsIds: artists,
    bandsIds: bands,
    trackIds: tracks,
    genresIds: genres,
    ...rest
  } = artistFromApi;
  return { id, artists, bands, tracks, genres, ...rest };
};

export default {
  Query: {
    album: async (_, { id }, { dataSources: { albumsAPI } }) => {
      const objectFromApi = await albumsAPI.getById(id);
      return transformAlbum(objectFromApi);
    },

    albums: async (_, { limit, offset }, { dataSources: { albumsAPI } }) => {
      const albumsObject = await albumsAPI.getAll(limit, offset);
      return albumsObject?.items.map((objectFromApi: AlbumFromApi) =>
        transformAlbum(objectFromApi)
      );
    },
  },

  Album: {
    artists: async ({ artists }, __, { dataSources }) => {
      return await Promise.all(
        artists.map(async (id) => {
          const artistFromApi = await dataSources.artistsAPI.getById(id);
          return transformArtist(artistFromApi);
        })
      );
    },

    bands: async ({ bands }, __, { dataSources }) => {
      return await Promise.all(
        bands.map(async (id) => {
          const bandFromApi = await dataSources.artistsAPI.getById(id);
          return transformBand(bandFromApi);
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

    genres: async ({ genres }, __, { dataSources }) => {
      return await Promise.all(
        genres.map(async (id) => {
          const genreFromApi = await dataSources.genresAPI.getById(id);
          return transformGenre(genreFromApi);
        })
      );
    },
  },

  Mutation: {
    createAlbum: async (_, { albumInput: input }, { dataSources: { albumsAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const objectFromApi = await albumsAPI.postCreate(input);
      return transformAlbum(objectFromApi);
    },

    deleteAlbum: async (_, { id }, { dataSources: { albumsAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const deleteAnswer = await albumsAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateAlbum: async (_, { albumInput: input }, { dataSources: { albumsAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const objectFromApi = await albumsAPI.putUpdate(input);
      return transformAlbum(objectFromApi);
    },
  },
};
