import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import jwt from 'koa-jwt';
import 'babel-polyfill';
import schema from './schema/index';
import models from './models';


const app = new Koa();

app.use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }));

const server = new ApolloServer({
  schema,
  context: ({ ctx: { state: user } }) => ({
    user,
    models,
  }),
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, async () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
