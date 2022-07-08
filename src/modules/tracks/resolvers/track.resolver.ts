import { MESSAGE } from '../../../constants/messages';
import { Track, TrackFromApi } from '../schemas/tracks.type';

const transformTrack = (artistFromApi: TrackFromApi): Track => {
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
    album: ({ album }, __, { dataSources }) => {
      return album; // todo ***
    },

    artists: ({ artists }, __, { dataSources }) => {
      return artists; // todo ***
    },

    bands: ({ bands }, __, { dataSources }) => {
      return bands; // todo ***
    },

    genres: ({ genres }, __, { dataSources }) => {
      return genres; // todo ***
    },
  },

  Mutation: {
    createTrack: async (_, { trackInput: input }, { dataSources: { tracksAPI }, token }) => {
      if (!token) return null;

      const trackFromApi = await tracksAPI.postCreate(input);
      return transformTrack(trackFromApi);
    },

    deleteTrack: async (_, { id }, { dataSources: { tracksAPI }, token }) => {
      if (!token) return { message: MESSAGE.NO_AUTHORIZATION };

      const deleteAnswer = await tracksAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateTrack: async (_, { trackInput: input }, { dataSources: { tracksAPI }, token }) => {
      if (!token) return null;

      const trackFromApi = await tracksAPI.putUpdate(input);
      return transformTrack(trackFromApi);
    },
  },
};
