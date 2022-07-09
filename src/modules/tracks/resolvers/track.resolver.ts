import { Track, TrackFromApi } from '../schemas/tracks.type';
import { MESSAGE } from '../../../constants/messages';
import { transformArtist } from './../../artists/resolvers/artists.resolver';
import { transformAlbum } from './../../albums/resolvers/album.resolver';
import { transformBand } from './../../bands/resolvers/band.resolver';
import { transformGenre } from './../../genres/resolvers/genres.resolver';
import { UserInputError } from 'apollo-server-core';

export const transformTrack = (artistFromApi: TrackFromApi): Track => {
  const {
    _id: id,
    albumId: album,
    artistsIds: artists,
    bandsIds: bands,
    genresIds: genres,
    ...rest
  } = artistFromApi;
  return { id, album, artists, bands, genres, ...rest };
};

export default {
  Query: {
    track: async (_, { id }, { dataSources: { tracksAPI } }) => {
      const trackFromApi = await tracksAPI.getById(id);
      return transformTrack(trackFromApi);
    },

    tracks: async (_, { limit, offset }, { dataSources: { tracksAPI } }) => {
      const tracksObject = await tracksAPI.getAll(limit, offset);
      return tracksObject?.items.map((trackFromApi: TrackFromApi) => transformTrack(trackFromApi));
    },
  },

  Track: {
    album: async ({ album: id }, __, { dataSources }) => {
      if (!id) return null;

      const objectFromApi = await dataSources.albumsAPI.getById(id);
      console.log('objectFromApi>>>', objectFromApi);

      return transformAlbum(objectFromApi);
    },

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
    createTrack: async (_, { trackInput: input }, { dataSources: { tracksAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const trackFromApi = await tracksAPI.postCreate(input);
      return transformTrack(trackFromApi);
    },

    deleteTrack: async (_, { id }, { dataSources: { tracksAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const deleteAnswer = await tracksAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateTrack: async (_, { trackInput: input }, { dataSources: { tracksAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const trackFromApi = await tracksAPI.putUpdate(input);
      return transformTrack(trackFromApi);
    },
  },
};
