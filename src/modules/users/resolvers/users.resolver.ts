import { User } from './../schemas/user.type';

const transformUser = (userFromApi): User => {
  const {
    _id: id,
    firstName,
    lastName: secondName,
    password,
    email,
    // favouriteArtistIds // ! *** ???
  } = userFromApi;
  return {
    id,
    firstName,
    secondName,
    email,
    password,
  };
};

export default {
  Query: {
    user: async (_source, { id: queryId }, { dataSources }) => {
      const userFromApi = await dataSources.userAPI.getUser(queryId);
      return transformUser(userFromApi);
    },

    jwt: async (_source, { email, password }, { dataSources }) => {
      const { jwt } = await dataSources.userAPI.postJwt({ email, password });
      return jwt;
    },
  },

  Mutation: {
    register: async (_source, { email, password, firstName, secondName }, { dataSources }) => {
      const userFromApi = await dataSources.userAPI.postRegister({
        email,
        password,
        firstName,
        lastName: secondName,
      });
      return transformUser(userFromApi);
    },
  },
};
