let myLibrary = []

function Book(title, author, read) {
	this.title = title
	this.author = author
	this.read = read
}

function addBookToLibrary(book) {
	myLibrary.push(book)
}