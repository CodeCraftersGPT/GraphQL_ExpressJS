# GraphQL_ExpressJS
Contains Sample GraphQL Queries

# queries

{
  books {
    id
    title
    author
  }
}

{
  books {
    id
    title
  }
}

{
  book(id: "1") {
    id
    title
    author
  }
}

{
  book(id: "1") {
    title
    author
  }
}

mutation {
  addBook(input: { title: "The Catcher in the Rye", author: "J.D. Salinger" }) {
    id
    title
    author
  }
}





