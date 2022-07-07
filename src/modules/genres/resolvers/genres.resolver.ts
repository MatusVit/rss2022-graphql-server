import { MESSAGE } from '../../../constants/messages';
import { Genre, GenreFromAPI } from './../schemas/genres.type';

const transformGenre = (genreFromApi: GenreFromAPI): Genre => {
  const { _id: id, name, description, country, year } = genreFromApi;
  return { id, name, description, country, year };
};

export default {
  Query: {
    genre: async (_source, { id }, { dataSources }) => {
      const genreFromApi = await dataSources.genresAPI.getById(id);
      return transformGenre(genreFromApi);
    },

    genres: async (_source, { limit, offset }, { dataSources }) => {
      const genresObject = await dataSources.genresAPI.getAll(limit, offset);
      return genresObject?.items.map((genreFromApi: GenreFromAPI) => transformGenre(genreFromApi));
    },
  },

  Mutation: {
    createGenre: async (_source, { name, description, country, year }, { dataSources, token }) => {
      if (!token) return null;

      const genreFromApi = await dataSources.genresAPI.postCreate({
        name,
        description,
        country,
        year,
      });
      return transformGenre(genreFromApi);
    },

    deleteGenre: async (_source, { id }, { dataSources, token }) => {
      if (!token) return { message: MESSAGE.NO_AUTHORIZATION };

      const deleteAnswer = await dataSources.genresAPI.deleteById(id);
      const { deletedCount } = deleteAnswer;
      return {
        deletedCount,
        message: deletedCount ? MESSAGE.SUCCESSFUL_DELETE : MESSAGE.NOTHING_DELETED,
      };
    },

    updateGenre: async (
      _source,
      { id, name, description, country, year },
      { dataSources, token }
    ) => {
      if (!token) return null;

      const genreFromApi = await dataSources.genresAPI.putUpdate(
        id,
        name,
        description,
        country,
        year
      );
      return transformGenre(genreFromApi);
    },
  },
};
