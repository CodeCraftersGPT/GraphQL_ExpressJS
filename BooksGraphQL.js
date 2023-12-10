const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// enable cors for 3000 port localhost'
const cors = require('cors');



// Sample data
const books = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: '3', title: '1984', author: 'George Orwell' },
];

// Define your GraphQL schema
const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  input BookInput {
    title: String!
    author: String!
  }

  type Mutation {
    addBook(input: BookInput): Book
  }
`);

// Define the root resolver functions
const root = {
  books: () => books,
  book: ({ id }) => books.find(book => book.id === id),
  addBook: ({ input }) => {
    const newBook = { id: String(books.length + 1), ...input };
    books.push(newBook);
    return newBook;
  },
};

// Create an Express server
const app = express();

app.use(cors());  

// Create a route for GraphQL using express-graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable the GraphQL playground
}));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`GraphQL server is running on http://localhost:${port}/graphql`);
});
