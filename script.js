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

Book.prototype.editBookInLibrary = function() {
	this.author = document.getElementById('edit-author').value
	this.read = document.getElementById('edit-read').checked
	this.pages = document.getElementById('edit-pages').value
	this.rating = document.getElementById('edit-rating').value
	this.genre = document.getElementById('edit-genre').value
	createBookCards(myLibrary)
}

Book.prototype.deleteBookFromLibrary = function() {
	myLibrary.splice(myLibrary.indexOf(this), 1)
	createBookCards(myLibrary)
}

function switchInputModal() {
	let modal = document.getElementById('input-modal')
	modal.classList.toggle('active')
	let title = document.getElementById('book-title')
	title.disabled = false
	let form = document.querySelector('form')
	form.reset()
}

function switchEditModal() {
	let modal = document.getElementById('edit-modal')
	modal.classList.toggle('active')
	let form = document.querySelector('form')
	form.reset()
}

let inputBookBtn = document.getElementById('add-book')
inputBookBtn.addEventListener('click', switchInputModal)

let inputResetBtn = document.querySelector('.discard')
inputResetBtn.addEventListener('click', switchInputModal)
let editResetBtn = document.getElementById('edit-discard')
editResetBtn.addEventListener('click', switchEditModal)

function addBook() {
	let book = new Book(
		document.getElementById('book-title').value,
		document.getElementById('book-author').value,
		document.getElementById('book-read').checked,
		document.getElementById('book-pages').value,
		document.getElementById('book-rating').value,
		document.getElementById('book-genre').value
	)
	book.addBookToLibrary()
	switchInputModal()
	createBookCards(myLibrary)
}

let addBookBtn = document.querySelector('.submit')
addBookBtn.addEventListener('click', addBook)

let editBookBtn = document.getElementById('edit-submit')

// ensures that an event listener isn't applied more than once
let helper = 0

function createBookCards(catalog) {
	let library = document.querySelector('.library')

	while (library.lastChild) {
		library.removeChild(library.lastChild)
	}

	// individually create a new card for each item in catalog
	for (let entry in catalog) {
		let book = document.createElement('div')
		book.classList.add('card', 'flex')

		let pencil = document.createElement('img')
		pencil.src = './assets/pencil.png'

		let edit = document.createElement('button')
		// edit.addEventListener('click', openEditModal)
		edit.addEventListener('click', function() {
			switchEditModal()

			// set inputs equal to the book's values
			document.getElementById('edit-title').innerHTML = `Title: <strong>${catalog[entry].title}</strong>`
			document.getElementById('edit-author').value = catalog[entry].author
			document.getElementById('edit-read').checked = catalog[entry].read
			document.getElementById('edit-pages').value = catalog[entry].pages
			document.getElementById('edit-rating').value = catalog[entry].rating
			document.getElementById('edit-genre').value = catalog[entry].genre

			for (helper; helper == 0; helper++)
			editBookBtn.addEventListener('click', function() {
				catalog[entry].editBookInLibrary()
				switchEditModal()
			})
		})
		edit.appendChild(pencil)
		edit.classList.add('edit')
		book.appendChild(edit)

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
		bookPages.innerText = `Pages: ${catalog[entry].pages}`
		bookRating.innerText = `My Rating: ${catalog[entry].rating}/5`
		bookGenre.innerText = `Genre: ${catalog[entry].genre}`
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




// create cards to see
let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', true, 300, 4, 'fantasy')
book1.addBookToLibrary()

let book2 = new Book('Animal Farm', 'George Orwell', false, 300, 4, 'Fantasy')
book2.addBookToLibrary()

let book3 = new Book('The Giver', 'Lois Lowry', true, 208, 3.5, 'Dystopia')
book3.addBookToLibrary()

createBookCards(myLibrary)