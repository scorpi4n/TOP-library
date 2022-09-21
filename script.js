let myLibrary = []

function Book(title, author) {
	this.title = title
	this.author = author
}

function addBookToLibrary(book) {
	myLibrary.push(book)
}