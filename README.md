# koa-apollo-server-example
An example GraphQL server that mainly demonstrates basic setup with Koa + Apollo Server + Knex + Basic Authentication(JWT) 

## What's included
- Babel & Nodemon Setup
- Modularized Schema
- DB Configuration
- Basic Authentication & Authorization Usage
- Environment Setup(ESLint & Prettier, Dotenv)

## Installing / Getting started

``` bash
# install dependencies
npm install

# serve using nodemon with hot reload
NODE_ENV=development npm run watch

# build for production with prettier and babel
npm run build

```



## References

[Why GraphQL?](https://blog.apollographql.com/why-graphql-is-the-future-3bec28193807)\
[Modularize schema](https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2)\
[Modularize resolvers](https://www.apollographql.com/docs/apollo-server/essentials/data.html#modularizing-resolvers)\
[Authentication](https://blog.pusher.com/handling-authentication-in-graphql/)\
[Authorization](https://www.apollographql.com/docs/guides/access-control.html)\
[GraphQL Best practice](https://graphql.github.io/learn/best-practices/)\
[How GraphQL turns a query into a response?](https://blog.apollographql.com/graphql-explained-5844742f195e)\
[Babel, Nodemon setup](https://github.com/babel/example-node-server)
