const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


// In-memory array to store books
//define books with around 5 books.
let books = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: '3', title: '1984', author: 'George Orwell' },
    { id: '4', title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling' },
    { id: '5', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find((book) => book.id === req.params.id);
    if (!book) {
        res.status(404).json({ error: 'Book not found' });
    } else {
        res.json(book);
    }
});

// POST a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
    const bookIndex = books.findIndex((book) => book.id === req.params.id);
    if (bookIndex === -1) {
        res.status(404).json({ error: 'Book not found' });
    } else {
        books[bookIndex] = req.body;
        res.json(books[bookIndex]);
    }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex((book) => book.id === req.params.id);
    if (bookIndex === -1) {
        res.status(404).json({ error: 'Book not found' });
    } else {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook[0]);
    }
});

// Start the server
app.listen(4001, () => {
    console.log('Server started on port 4001');
});
