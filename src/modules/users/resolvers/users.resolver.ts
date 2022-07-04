/*
  {
    _id: '62c2abd7fe035054846db5a9',
    firstName: 'Vital1',
    lastName: 'Matus',
    password: '$2b$10$XX6EbUz41YI3SbXVAVTrPuBLvzsGNMl2PmQtVIIYD6olm3wDs28gW',
    email: 'vital1@gmail.com',
    __v: 0,
  } 
*/

export default {
  Query: {
    user: async (_source, { id: queryId }, { dataSources }) => {
      const {
        _id: id,
        firstName,
        lastName: secondName,
        password,
        email,
      } = await dataSources.userAPI.getUser(queryId);

      return {
        id,
        firstName,
        secondName,
        email,
        password,
      };
    },
  },
};
