let myLibrary = [];

class Book {
	constructor(title, author, read, pages, rating, genre) {
		this.title = title;
		this.author = author;
		this.read = read;
		this.pages = pages;
		this.rating = rating;
		this.genre = genre;
	}

	addBookToLibrary() {
		myLibrary.push(this);
	}

	editBookInLibrary() {
		this.author = document.getElementById("edit-author").value;
		this.read = document.getElementById("edit-read").checked;
		this.pages = document.getElementById("edit-pages").value;
		this.rating = document.getElementById("edit-rating").value;
		this.genre = document.getElementById("edit-genre").value;
		createBookCards(myLibrary);
	}

	deleteBookFromLibrary() {
		myLibrary.splice(myLibrary.indexOf(this), 1);
		createBookCards(myLibrary);
	}
}

const editModal = (function () {
	const elements = (function () {
		let editResetBtn = document.getElementById("edit-discard");
		editResetBtn.addEventListener("click", toggle);

		let submitBtn = document.getElementById("edit-submit");

		return {
			submitBtn,
		};
	})();

	function toggle() {
		let modal = document.getElementById("edit-modal");
		modal.classList.toggle("active");
		let form = document.querySelector("form");
		form.reset();
	}

	return {
		elements,
		toggle,
	};
})();

const inputModal = (function () {
	const elements = (function () {
		let inputResetBtn = document.querySelector(".discard");
		inputResetBtn.addEventListener("click", toggle);

		let submitBtn = document.querySelector(".submit");
		submitBtn.addEventListener("click", addBook);
	})();

	function toggle() {
		let modal = document.getElementById("input-modal");
		modal.classList.toggle("active");
		let title = document.getElementById("book-title");
		title.disabled = false;
		let form = document.querySelector("form");
		form.reset();
	}

	return {
		toggle,
	};
})();

let inputBookBtn = document.getElementById("add-book");
inputBookBtn.addEventListener("click", inputModal.toggle);

function addBook() {
	let book = new Book(
		document.getElementById("book-title").value,
		document.getElementById("book-author").value,
		document.getElementById("book-read").checked,
		document.getElementById("book-pages").value,
		document.getElementById("book-rating").value,
		document.getElementById("book-genre").value
	);
	book.addBookToLibrary();
	inputModal.toggle();
	createBookCards(myLibrary);
}

// ensures that an event listener isn't applied more than once
let helper = 0;

function createBookCards(catalog) {
	let library = document.querySelector(".library");

	while (library.lastChild) {
		library.removeChild(library.lastChild);
	}

	// individually create a new card for each item in catalog
	for (let entry in catalog) {
		let book = document.createElement("div");
		book.classList.add("card", "flex");

		let pencil = document.createElement("img");
		pencil.src = "./assets/pencil.png";

		let edit = document.createElement("button");
		edit.addEventListener("click", function () {
			editModal.toggle();

			// set inputs equal to the book's values
			document.getElementById(
				"edit-title"
			).innerHTML = `Title: <strong>${catalog[entry].title}</strong>`;
			document.getElementById("edit-author").value = catalog[entry].author;
			document.getElementById("edit-read").checked = catalog[entry].read;
			document.getElementById("edit-pages").value = catalog[entry].pages;
			document.getElementById("edit-rating").value = catalog[entry].rating;
			document.getElementById("edit-genre").value = catalog[entry].genre;

			for (helper; helper == 0; helper++)
				editModal.elements.submitBtn.addEventListener("click", function () {
					catalog[entry].editBookInLibrary();
					editModal.toggle();
				});
		});
		edit.appendChild(pencil);
		edit.classList.add("edit");
		book.appendChild(edit);

		let trash = document.createElement("img");
		trash.src = "./assets/delete.png";

		let remove = document.createElement("button");
		remove.addEventListener("click", function () {
			catalog[entry].deleteBookFromLibrary();
		});
		remove.appendChild(trash);
		remove.classList.add("delete");
		book.appendChild(remove);

		let bookName = document.createElement("div");
		book.appendChild(bookName);
		let bookTitle = document.createElement("h1");
		let bookAuthor = document.createElement("h2");
		bookTitle.innerText = catalog[entry].title;
		bookAuthor.innerText = catalog[entry].author;
		bookName.appendChild(bookTitle);
		bookName.appendChild(bookAuthor);

		let bookInfo = document.createElement("ul");
		book.appendChild(bookInfo);
		let bookRead = document.createElement("li");
		let bookPages = document.createElement("li");
		let bookRating = document.createElement("li");
		let bookGenre = document.createElement("li");
		bookPages.innerText = `Pages: ${catalog[entry].pages}`;
		bookRating.innerText = `My Rating: ${catalog[entry].rating}/5`;
		bookGenre.innerText = `Genre: ${catalog[entry].genre}`;
		bookInfo.appendChild(bookRead);
		bookInfo.appendChild(bookPages);
		bookInfo.appendChild(bookRating);
		bookInfo.appendChild(bookGenre);

		if (catalog[entry].read == true) {
			book.classList.add("read");
			bookRead.innerText = "read";
		} else {
			book.classList.add("unread");
			bookRead.innerText = "unread";
		}

		library.appendChild(book);
	}
}

// create welcome screen
let library = document.querySelector(".library");
let header1 = document.createElement("h1");
header1.style.gridColumn = "1 / -1";
header1.innerText =
	"Welcome! Add books with the button in the top right corner. Once you've added books to your library, you're free to edit them if something is wrong or delete them if you so desire.";
library.appendChild(header1);
