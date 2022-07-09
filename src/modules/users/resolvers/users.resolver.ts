import { User } from './../schemas/user.type';

const transformUser = (userFromApi): User => {
  const { _id: id, lastName: secondName, ...rest } = userFromApi;
  return { id, secondName, ...rest };
};

export default {
  Query: {
    user: async (_, { id: queryId }, { dataSources }) => {
      const userFromApi = await dataSources.userAPI.getUser(queryId);
      return transformUser(userFromApi);
    },

    jwt: async (_, { email, password }, { dataSources }) => {
      const { jwt } = await dataSources.userAPI.postJwt({ email, password });
      return jwt;
    },
  },

  Mutation: {
    register: async (
      _,
      { userInput: { email, password, firstName, secondName } },
      { dataSources }
    ) => {
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
