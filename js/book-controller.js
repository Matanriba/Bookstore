'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks().sort(getSortingBy)
    var strHTMLs = books.map(function (book) {
        return (`
        <tr>\n
        <td>\n
        ${book.id}
        </td>\n
        <td class="title-td">\n
        ${book.name}
        </td>\n
        <td>\n
        ${formatCurrency(book.price)}
        </td>\n
        <td>\n
        <button data-trans="read-btn" onclick="onReadBook('${book.id}')" class="action-btns read-book">Read</button>
        <button data-trans="update-btn" onclick="onUpdateBook('${book.id}')" class="action-btns update-book">Update</button>
        <button data-trans="delete-btn" onclick="onRemoveBook('${book.id}')" class="action-btns delete-book">Delete</button>
        </td>\n
        <tr>\n
        `)
    }).join('')
    var elTableArea = document.querySelector('.books-table');
    elTableArea.innerHTML = strHTMLs;
    doTrans();
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    renderModal('update', bookId);
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.read-modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('.img').innerHTML = `<img src="${book.imgUrl}" alt="">`
    elModal.querySelector('h4').innerText = formatCurrency(book.price)
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.rating-text').innerText = book.rating
    elModal.classList.toggle('modal-hide');
    var elAddModal = document.querySelector('.add-modal')
    if (!elAddModal.classList.contains('modal-hide')) elAddModal.classList.toggle('modal-hide')
}

function setUpdatedBookPrice(bookId) {
    var elPrice = document.querySelector('[name=update-price]');
    var price = +elPrice.value;

    if (!price) return;
    else updateBook(bookId, price)
    onCloseAddModal();
}

function setNewBookAttributes() {
    var elname = document.querySelector('[name=book-name]');
    var name = elname.value;
    var elPrice = document.querySelector('[name=book-price]');
    var price = +elPrice.value;

    if (!name || !price) return;
    else addBook(name, price)

    onCloseAddModal();

}

function onAddBook() {
    renderModal('add');
}

function renderModal(type, bookId) {
    var strHTML;
    switch (type) {
        case 'add':
            strHTML = `
        <h4 data-trans="modal-title">Book Title</h4>
        <input data-trans="modal-title" name="book-name" type="text" placeholder="Book Title"/>
        <h4 data-trans="modal-price">Book Price</h4>
        <input data-trans="modal-price" name="book-price" type="text" placeholder="Book Price"/>
        <button data-trans="modal-add-btn" onclick="setNewBookAttributes()">Add</button>
        <button data-trans="modal-close-btn" onclick="onCloseAddModal()">Close</button>
        `
            break;
        case 'update':
            strHTML = `
            <h4 data-trans="modal-update">Update Price</h4>
            <input data-trans="modal-update" name="update-price" type="text" placeholder="Update Price"/>
            <button data-trans="modal-update-btn" onclick="setUpdatedBookPrice('${bookId}')">Update</button>
            <button data-trans="modal-close-btn" onclick="onCloseAddModal()">Close</button>
            `
    }
    var elModal = document.querySelector('.add-modal')
    elModal.innerHTML = strHTML;
    elModal.classList.toggle('modal-hide');
    doTrans();
}


function onCloseModal() {
    var elModal = document.querySelector('.read-modal')
    elModal.classList.toggle('modal-hide');
}

function onCloseAddModal() {
    var elModal = document.querySelector('.add-modal')
    elModal.classList.add('modal-hide');
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onRatingChange(diff) {
    var currBook = getBookByName(document.querySelector('h3').innerText)

    changeBookRating(currBook, diff);
    console.log(currBook, currBook.rating)
    renderBooks();
    document.querySelector('.rating-text').innerText = currBook.rating

}


function onSetSortBy(sortBy) {
    setSortBy(sortBy);
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}