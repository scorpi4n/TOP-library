function switchModal() {
	let modal = document.getElementById('input-modal')
	modal.classList.toggle('active')

	// re-enable the title input in case edit was used
	let title = document.getElementById('book-title')
	title.disabled = false

	let form = document.querySelector('form')
	form.reset()
}

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
	switchModal()
	createBookCards(myLibrary)
}

// function editBook() {
// 	catalog[entry].author = document.getElementById('book-author').value
// 	catalog[entry].read = document.getElementById('book-read').checked
// 	catalog[entry].pages = document.getElementById('book-pages').value
// 	catalog[entry].rating = document.getElementById('book-rating').value
// 	catalog[entry].genre = document.getElementById('book-genre').value
// 	switchModal()
// 	createBookCards(myLibrary)
// }

function openEditModal() {
	switchModal()

	// set inputs equal to the book's values
	document.getElementById('book-title').value = catalog[entry].title
	document.getElementById('book-title').disabled = true
	document.getElementById('book-author').value = catalog[entry].author
	document.getElementById('book-read').checked = catalog[entry].read
	document.getElementById('book-pages').value = catalog[entry].pages
	document.getElementById('book-rating').value = catalog[entry].rating
	document.getElementById('book-genre').value = catalog[entry].genre
}