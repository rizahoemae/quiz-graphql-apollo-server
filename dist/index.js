import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const books = [
    {
        id: 1,
        title: "The Awakening",
        authorId: 1,
    },
    {
        id: 2,
        title: "City of Glass",
        authorId: 1,
    },
];
const authors = [
    {
        id: 1,
        name: "Mulyono",
    },
    {
        id: 2,
        name: "Fufufafa",
    },
];
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    authorId: Int
  }
  type Author {
    id: ID!
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  }
`;
const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
