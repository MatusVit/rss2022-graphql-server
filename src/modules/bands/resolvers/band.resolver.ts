import { MESSAGE } from '../../../constants/messages';
import { Band, BandFromApi, Member, MemberFromApi } from '../schemas/bands.type';
import { transformGenre } from './../../genres/resolvers/genres.resolver';
import { transformArtist } from './../../artists/resolvers/artists.resolver';
import { UserInputError } from 'apollo-server-core';

export const transformBand = (bandFromApi: BandFromApi): Band => {
  const { _id: id, members: membersFromApi, genresIds: genres, ...rest } = bandFromApi;

  const members = membersFromApi.map(({ _id: artistID, ...others }: MemberFromApi) => ({
    artistID,
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
    members: async ({ members }, __, { dataSources }) => {
      return await Promise.all(
        members.map(async (member: Member) => {
          const artistFromApi = await dataSources.artistsAPI.getById(member.artistID);
          const { id, firstName, secondName, middleName } = transformArtist(artistFromApi);
          return {
            id,
            firstName,
            secondName,
            middleName,
            instrument: member.instrument,
            years: member.years,
          };
        })
      );
    },
    genres: async ({ genres }, __, { dataSources }) => {
      return await Promise.all(
        genres.map(async (genreId) => {
          const genreFromApi = await dataSources.genresAPI.getById(genreId);
          return transformGenre(genreFromApi);
        })
      );
    },
  },

  Mutation: {
    createBand: async (_, { bandInput: input }, { dataSources: { bandsAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const objectFromApi = await bandsAPI.postCreate(input);
      return transformBand(objectFromApi);
    },

    deleteBand: async (_, { id }, { dataSources: { bandsAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const deleteAnswer = await bandsAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateBand: async (_, { bandInput: input }, { dataSources: { bandsAPI }, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const objectFromApi = await bandsAPI.putUpdate(input);
      return transformBand(objectFromApi);
    },
  },
};
