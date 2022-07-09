import { MESSAGE } from '../../../constants/messages';
import { Artist, ArtistFromAPI } from './../schemas/artists.type';

export const transformArtist = (artistFromApi: ArtistFromAPI): Artist => {
  const { _id: id, bandsIds: bands, ...rest } = artistFromApi;
  return { id, bands, ...rest };
};

export default {
  Query: {
    artist: async (_, { id }, { dataSources }) => {
      const artistFromApi = await dataSources.artistsAPI.getById(id);
      return transformArtist(artistFromApi);
    },

    artists: async (_, { limit, offset }, { dataSources }) => {
      const artistsObject = await dataSources.artistsAPI.getAll(limit, offset);
      return artistsObject?.items.map((artistFromApi: ArtistFromAPI) =>
        transformArtist(artistFromApi)
      );
    },
  },

  Artist: {
    bands: ({ bands }, __, { dataSources }) => {
      return bands; // todo ***
    },
  },

  Mutation: {
    createArtist: async (_, { artistInput: input }, { dataSources, token }) => {
      if (!token) return { message: MESSAGE.NO_AUTHORIZATION };

      const artistFromApi = await dataSources.artistsAPI.postCreate(input);
      return transformArtist(artistFromApi);
    },

    deleteArtist: async (_, { id }, { dataSources, token }) => {
      if (!token) return { message: MESSAGE.NO_AUTHORIZATION };

      const deleteAnswer = await dataSources.artistsAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateArtist: async (_, { artistInput: input }, { dataSources, token }) => {
      if (!token) return { message: MESSAGE.NO_AUTHORIZATION };

      const artistFromApi = await dataSources.artistsAPI.putUpdate(input);
      return transformArtist(artistFromApi);
    },
  },
};
