const express = require('express');
const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

const app = express();
// app.use(express.json({
//     limit: '10MB'
// }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')))
const PORT = 3000;

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get('/', function (req, res) {
    res.send('Welcome to Books API')
})

let books = fs.readFileSync('./books.json', 'utf8');
books = JSON.parse(books);

app.get(`/books`, (request, response) => {
    let newBooks = books;
    if (request.query.year) {
        const inputYear = String(request.query.year);
        newBooks = books.filter((book) => book.published_year === inputYear);
    } else if (request.query.pricestart && request.query.priceend) {
        const priceStart = Number(request.query.pricestart);
        const priceEnd = Number(request.query.priceend);
        newBooks = books.filter((book) => {
            return (book.price > priceStart && book.price < priceEnd);
        });
    }
    response.json(newBooks);
});

app.get(`/books/:id`, (request, response) => {
    const bookId = String(request.params.id);
    const getbook = books.find((book) => book.isbn === bookId);
    if (!getbook) {
        response.status(500).send('Book not found.')
    } else {
        response.json(getbook);
    }
});

app.post(`/books`, (request, response) => {
    // const errors = validationResult(request);
    // if (!errors.isEmpty()) {
    //     return response.status(422).json({ errors: errors.array() })
    // }

    const incomingbook = request.body;
    books.push(incomingbook);
    writeJSONFile(books);
    response.json(books);
});

app.put(`/books/:id`, (request, response) => {
    const bookId = String(request.params.id);
    const body = request.body;
    const book = books.find((book) => book.isbn === bookId);
    const index = books.indexOf(book);

    if (!book) {
        response.status(500).send('Book not found.');
    } else {
        const updatedbook = { ...book, ...body };
        books[index] = updatedbook;
        writeJSONFile(books);
        response.send(updatedbook);
    }
});


app.delete(`/books/:id`, (request, response) => {
    const bookId = String(request.params.id);
    const book = books.find((book) => book.isbn === bookId);

    if (!book) {
        response.status(500).send('Book not found.');
    } else {
        const newbooks = books.filter((book) => book.isbn != bookId);
        books = newbooks;
        writeJSONFile(books);
        response.send(books);
    }
});

function writeJSONFile(content) {
    let fileName = 'books.json';
    let filePath = path.join(__dirname, fileName);

    fs.writeFileSync(filePath, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}
