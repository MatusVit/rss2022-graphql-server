import { MESSAGE } from '../../../constants/messages';
import { Band, BandFromApi, Member, MemberFromApi } from '../schemas/bands.type';

const transformBand = (bandFromApi: BandFromApi): Band => {
  const { _id: id, members: membersFromApi, genresIds: genres, ...rest } = bandFromApi;

  const members = membersFromApi.map(({ _id: artistId, ...others }: MemberFromApi) => ({
    artistId,
    ...others,
  }));

  return { id, members, genres, ...rest };
};

export default {
  Query: {
    band: async (_, { id }, { dataSources: { bandsAPI } }) => {
      const objectFromApi = await bandsAPI.getById(id);
      return transformBand(objectFromApi);
    },

    bands: async (_, { limit, offset }, { dataSources: { bandsAPI } }) => {
      const bandsObject = await bandsAPI.getAll(limit, offset);
      return bandsObject?.items.map((objectFromApi: BandFromApi) => transformBand(objectFromApi));
    },
  },

  Band: {
    members: ({ members }, __, { dataSources }) => {
      return members; // todo ***
    },

    genres: ({ genres }, __, { dataSources }) => {
      return genres; // todo ***
    },
  },

  Mutation: {
    //   createAlbum: async (_, { albumInput: input }, { dataSources: { bandsAPI }, token }) => {
    //     if (!token) return null;
    //     const objectFromApi = await bandsAPI.postCreate(input);
    //     return transformAlbum(objectFromApi);
    //   },
    //   deleteAlbum: async (_, { id }, { dataSources: { bandsAPI }, token }) => {
    //     if (!token) return { message: MESSAGE.NO_AUTHORIZATION };
    //     const deleteAnswer = await bandsAPI.deleteById(id);
    //     const { deletedCount } = deleteAnswer;
    //     return {
    //       deletedCount,
    //       message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
    //     };
    //   },
    //   updateAlbum: async (_, { albumInput: input }, { dataSources: { bandsAPI }, token }) => {
    //     if (!token) return null;
    //     const objectFromApi = await bandsAPI.putUpdate(input);
    //     return transformAlbum(objectFromApi);
    //   },
  },
};
