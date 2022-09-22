let myLibrary = []

function Book(title, author, read, pages, rating, genre) {
	this.title = title
	this.author = author
	this.read = read
	this.pages = pages
	this.rating = rating
	this.genre = genre
}

function addBookToLibrary(book) {
	myLibrary.push(book)
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
