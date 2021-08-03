const KEY = 'books';
const PAGE_SIZE = 3;
var gPageIdx = 0;
var gBooks = [];
var gSortBy;

_createBooks()

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx--;
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE <= 0) {
        gPageIdx = 0;
    }
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl: `img/${name}.jpg`,
        desc: makeLorem(),
        rating: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (books && books.length) {
        gBooks = books;
    } else {
        books = [
            _createBook('Black Ice', 9.90),
            _createBook('The Last Thing He Told Me', 25.90),
            _createBook('The Cellist', 17.90),
            _createBook('People We Meet On Vacation', 14.90),
            _createBook('The Paper Palace', 19.90)
        ]
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function getNumOfPages() {
    return Math.ceil(gBooks.length / PAGE_SIZE)
}

function getAllBooks() {
    return gBooks;
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price));
    _saveBooksToStorage();
    renderBooks();
}

function updateBook(bookId, price) {
    var book = gBooks.find(function (book) {
        console.log(book.id, bookId)
        return book.id === bookId
    })
    book.price = price;
    _saveBooksToStorage()
    renderBooks()
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}


function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function getBookByName(bookName) {
    var book = gBooks.find(function (book) {
        return bookName === book.name
    })
    return book
}

function changeBookRating(book, diff) {
    if (book.rating + diff > 10 || book.rating + diff < 0) return;

    book.rating += diff;
    _saveBooksToStorage();
}

function setSortBy(sortBy) {

    switch (sortBy) {
        case 'Title':
            gSortBy = 'name'
            console.log(`setting gSortBy to: ${gSortBy}`)
            break;
        case 'Price':
            gSortBy = 'price'
            console.log(`setting gSortBy to: ${gSortBy}`)
            break;
        case 'כותרת':
            gSortBy = 'name'
            console.log(`setting gSortBy to: ${gSortBy}`)
            break;
        case 'מחיר':
            gSortBy = 'price'
            console.log(`setting gSortBy to: ${gSortBy}`)
            break;
    }
}

