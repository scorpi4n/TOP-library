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
	let title = document.getElementById('book-title')
	title.disabled = false
	let form = document.querySelector('form')
	form.reset()
}

let inputBookBtn = document.getElementById('add-book')
inputBookBtn.addEventListener('click', switchModal)

let resetBtn = document.querySelector('.discard')
resetBtn.addEventListener('click', switchModal)

function addBook() {
	let title = document.getElementById('book-title').value
	let author = document.getElementById('book-author').value
	let read = document.getElementById('book-read').checked
	let pages = document.getElementById('book-pages').value
	let rating = document.getElementById('book-rating').value
	let genre = document.getElementById('book-genre').value

	let book = new Book(title, author, read, pages, rating, genre)
	book.addBookToLibrary()
	switchModal()
	createBookCards(myLibrary)
}

let addBookBtn = document.querySelector('.submit')
addBookBtn.addEventListener('click', addBook)

function createBookCards(catalog) {
	let library = document.querySelector('.library')

	while (library.lastChild) {
		library.removeChild(library.lastChild)
	}

	for (let entry in catalog) {
		let book = document.createElement('div')
		book.classList.add('card', 'flex')

		let pencil = document.createElement('img')
		pencil.src = './assets/pencil.png'

		let edit = document.createElement('button')
		edit.addEventListener('click', function() {
			switchModal()

			// set inputs equal to the book's values
			let titleInput = document.getElementById('book-title')
			let authorInput = document.getElementById('book-author')
			let readInput = document.getElementById('book-read')
			let pagesInput = document.getElementById('book-pages')
			let ratingInput = document.getElementById('book-rating')
			let genreInput = document.getElementById('book-genre')
			titleInput.value = catalog[entry].title
			titleInput.disabled = true
			authorInput.value = catalog[entry].author
			pagesInput.value = catalog[entry].pages
			ratingInput.value = catalog[entry].rating
			genreInput.value = catalog[entry].genre
			if (catalog[entry].read == true) {
				readInput.checked = true
			}

			// edit the book in catalog based on the title
			addBookBtn.removeEventListener('click', addBook)
			addBookBtn.addEventListener('click', function() {
				if (catalog[entry].title == titleInput.value) {
					catalog[entry].author = authorInput.value
					catalog[entry].read = readInput.checked
					catalog[entry].pages = pagesInput.value
					catalog[entry].rating = ratingInput.value
					catalog[entry].genre = genreInput.value
				}
				switchModal()
				createBookCards(myLibrary)
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
book1 = new Book('The Hobbit', 'J.R.R. Tolkien', true, 300, 4, 'fantasy')
book1.addBookToLibrary()

book2 = new Book('Animal Farm', 'George Orwell', false, 300, 4, 'Fantasy')
book2.addBookToLibrary()

book3 = new Book('The Giver', 'Lois Lowry', true, 208, 3.5, 'Dystopia')
book3.addBookToLibrary()

createBookCards(myLibrary)