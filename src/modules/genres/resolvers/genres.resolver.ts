import { UserInputError } from 'apollo-server-core';
import { MESSAGE } from '../../../constants/messages';
import { Genre, GenreFromAPI } from './../schemas/genres.type';

export const transformGenre = (genreFromApi: GenreFromAPI): Genre => {
  const { _id: id, ...rest } = genreFromApi;
  return { id, ...rest };
};

export default {
  Query: {
    genre: async (_, { id }, { dataSources }) => {
      const genreFromApi = await dataSources.genresAPI.getById(id);
      return transformGenre(genreFromApi);
    },

    genres: async (_, { limit, offset }, { dataSources }) => {
      const genresObject = await dataSources.genresAPI.getAll(limit, offset);
      return genresObject?.items.map((genreFromApi: GenreFromAPI) => transformGenre(genreFromApi));
    },
  },

  Mutation: {
    createGenre: async (_, { genreInput: input }, { dataSources, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const genreFromApi = await dataSources.genresAPI.postCreate(input);
      return transformGenre(genreFromApi);
    },

    deleteGenre: async (_, { id }, { dataSources, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const deleteAnswer = await dataSources.genresAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateGenre: async (_, { genreInput: input }, { dataSources, token }) => {
      if (!token) throw new UserInputError(MESSAGE.NO_AUTHORIZATION);

      const genreFromApi = await dataSources.genresAPI.putUpdate(input);
      return transformGenre(genreFromApi);
    },
  },
};
