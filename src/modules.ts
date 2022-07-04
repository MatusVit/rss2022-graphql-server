import * as path from 'path';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync(path.join(__dirname, './modules/**/*.resolver.ts'));
// console.log('resolversArray', resolversArray); // ! ***

export const resolvers = mergeResolvers(resolversArray);

const typesArray = loadFilesSync(path.join(__dirname, './modules/**/*.graphql'));
// console.log('typesArray', typesArray); // ! ***

export const typeDefs = mergeTypeDefs(typesArray);
