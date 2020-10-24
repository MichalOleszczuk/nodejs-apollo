import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/UserResolver';

async function main() {
  await createConnection();
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver],
  });
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.listen(4000);
  console.log('Server has started!');
}

main();
