import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from 'express';
import * as http from 'http';
import 'dotenv/config';

import { resolvers, typeDefs } from './modules';
import { UserAPI } from './modules/users/services/UserAPI';

console.log('\nSTART!!!');
const port = process.env.EXPRESS_PORT || 4000;

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources: () => {
      return {
        userAPI: new UserAPI(),
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, path: '/api' });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
};

startApolloServer(typeDefs, resolvers);
