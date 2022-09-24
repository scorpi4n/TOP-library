let myLibrary = []

function Book(title, author, read, pages, rating, genre) {
	this.title = title
	this.author = author
	this.read = read
	this.pages = pages
	this.rating = rating
	this.genre = genre
}

Book.prototype.addBookToLibrary = function() {
	myLibrary.push(this)
}

let addBookBtn = document.getElementById('add-book')
addBookBtn.addEventListener('click', function() {
	let modal = document.getElementById('input-modal')
	if (modal.style.display == 'block') {
		modal.style.display = 'none'
		addBookBtn.innerText = 'add new book'
	} else {
		modal.style.display = 'block'
		addBookBtn.innerText = 'close'
	}
})

function createBookCards(catalog) {
	let library = document.querySelector('.library')

	while (library.lastChild) {
		library.removeChild(library.lastChild)
	}

	for (let entry in catalog) {
		let book = document.createElement('div')
		book.classList.add('card', 'flex')

		let bookName = document.createElement('div')
		book.appendChild(bookName)
		let bookTitle = document.createElement('h1')
		let bookAuthor = document.createElement('h2')
		bookTitle.innerText = catalog[entry].title
		bookAuthor.innerText = catalog[entry].author
		bookName.appendChild(bookTitle)
		bookName.appendChild(bookAuthor)

		let bookInfo = document.createElement('ul')
		book.appendChild(bookInfo)
		let bookRead = document.createElement('li')
		let bookPages = document.createElement('li')
		let bookRating = document.createElement('li')
		let bookGenre = document.createElement('li')
		bookPages.innerText = catalog[entry].pages
		bookRating.innerText = catalog[entry].rating
		bookGenre.innerText = catalog[entry].genre
		bookInfo.appendChild(bookRead)
		bookInfo.appendChild(bookPages)
		bookInfo.appendChild(bookRating)
		bookInfo.appendChild(bookGenre)

		if (catalog[entry].read == true) {
			book.classList.add('read')
			bookRead.innerText = 'read'
		} else {
			book.classList.add('unread')
			bookRead.innerText = 'unread'
		}

		library.appendChild(book)
	}
}