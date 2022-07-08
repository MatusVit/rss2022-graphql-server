import { Album, AlbumFromApi } from './../schemas/albums.type';
import { MESSAGE } from '../../../constants/messages';

const transformAlbum = (artistFromApi: AlbumFromApi): Album => {
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
    artists: ({ artists }, __, { dataSources }) => {
      return artists; // todo ***
    },

    bands: ({ bands }, __, { dataSources }) => {
      return bands; // todo ***
    },

    tracks: ({ tracks }, __, { dataSources }) => {
      return tracks; // todo ***
    },

    genres: ({ genres }, __, { dataSources }) => {
      return genres; // todo ***
    },
  },

  Mutation: {
    createAlbum: async (_, { albumInput: input }, { dataSources: { albumsAPI }, token }) => {
      if (!token) return null;

      const objectFromApi = await albumsAPI.postCreate(input);
      return transformAlbum(objectFromApi);
    },

    deleteAlbum: async (_, { id }, { dataSources: { albumsAPI }, token }) => {
      if (!token) return { message: MESSAGE.NO_AUTHORIZATION };

      const deleteAnswer = await albumsAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateAlbum: async (_, { albumInput: input }, { dataSources: { albumsAPI }, token }) => {
      if (!token) return null;

      const objectFromApi = await albumsAPI.putUpdate(input);
      return transformAlbum(objectFromApi);
    },
  },
};
