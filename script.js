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

function switchModal() {
	let modal = document.getElementById('input-modal')
	if (modal.style.display == 'block') {
		modal.style.display = 'none'
		inputBookBtn.innerText = 'Add new book'
	} else {
		modal.style.display = 'block'
		inputBookBtn.innerText = 'Close'
	}
	let form = document.querySelector('form')
	form.reset()
}

let inputBookBtn = document.getElementById('add-book')
inputBookBtn.addEventListener('click', switchModal)

let resetBtn = document.querySelector('.discard')
resetBtn.addEventListener('click', switchModal)

let addBookBtn = document.querySelector('.submit')
addBookBtn.addEventListener('click', function() {
	let title = document.getElementById('book-title').value
	let author = document.getElementById('book-author').value
	let read = document.getElementById('book-read').checked
	console.log(read.value)
	let pages = document.getElementById('book-pages').value
	let rating = document.getElementById('book-rating').value
	let genre = document.getElementById('book-genre').value

	book = new Book(title, author, read, pages, rating, genre)
	book.addBookToLibrary()
	switchModal()
	createBookCards(myLibrary)
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