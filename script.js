// const myLibrary = [

//     { title:"Gone with the Wind?", author: "Bree Zee", date: "2024", read: "on"},
//     { title:"Byte Me?", author: "Chip L. O’Geek", date: "2023", read: undefined},
//     { title: "Sofa, So Good", author: "Lou N. Geste", date: "2022", read: "on"},
//     { title: "Java the Cup", author: "Mocha Latté", date: "2024", read: undefined }

// ];

class Book {
    constructor(title, author, date, read) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.read = read;
    }

    toggleReadStatus(event) {
        this.read = !this.read;
        const theButton = event.target;
        if (this.read) {
            theButton.classList.remove("unread");
            theButton.classList.add("read");
            theButton.value = "Read";
        } else {
            theButton.classList.remove("read");
            theButton.classList.add("unread");
            theButton.value = "Unread";
        }
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(...args) { args.forEach(arg => this.books.push(arg)) };

    removeBook() { this.books = this.books.filter(book => book.title !== title); }

    listBooks() { return this.books }

}

const myLibrary = new Library;
templateBook1 = new Book("Gone with the Wind?", "Bree Zee", "2024", "on");
templateBook2 = new Book("Sofa, So Good", "Lou N. Geste", "2022", "on");
templateBook3 = new Book("Byte Me?", "Chip L. O’Geek", "2023", undefined);
templateBook4 = new Book("Java the Cup", "Mocha Latté", "2024", undefined);

myLibrary.addBook(templateBook1, templateBook2, templateBook3, templateBook4);


const dialog = document.querySelector("dialog");
const openDialog = document.querySelector("#add")
const addButton = document.querySelector("dialog #send");
const closeButton = document.querySelector("dialog #cancel");
const library = document.querySelector("#library");
const prova = document.createElement("p");

const form = document.querySelector("#addBook")
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");

prova.textContent = "PORCO DIO";

function linkDeleteButtons(id) {
    const deleteButton = document.querySelector(`input[id="${id}"]`);

    deleteButton.addEventListener("click", function (event) {
        let currentButton = event.target;
        let title = currentButton.id;

        deleteBook(title);

        console.log(currentButton.id);

    })
}

function displayBooks() {

    while (library.firstChild) {
        library.removeChild(library.lastChild);
    }

    myLibrary.books.forEach((book) => {
        const newBook = document.createElement('div');
        newBook.classList.add('book');

        // CREATE BOOKCOVER
        const newBookCover = document.createElement('div');
        newBookCover.classList.add('bookCover');

        // CREATE H3 - APPEND title
        const newTitle = document.createElement('h3');
        newTitle.classList.add('title');
        newTitle.textContent = book.title;

        // CREATE DETAILS & TOP AND APPEND CHILDREN

        const newDetails = document.createElement('div');
        newDetails.classList.add('details');

        const newTop = document.createElement('div');
        newTop.classList.add('top');

        const newAuthor = document.createElement('h4');
        newAuthor.classList.add('author');
        newAuthor.textContent = book.author;

        const newYear = document.createElement('div');
        newYear.classList.add('year');
        newYear.textContent = book.date;

        newTop.appendChild(newAuthor);
        newTop.appendChild(newYear);
        newDetails.appendChild(newTop);
        newBookCover.appendChild(newTitle);
        newBookCover.appendChild(newDetails);  // Use newDetails here

        const newBookUnder = document.createElement('div');
        newBookUnder.classList.add('bookUnder');

        /* <div class="commands">
            <input type="button" name="delete" id="delete" value="Delete">&nbsp;&nbsp;
            <input type="button" name="readStatus" id="delete" value="Read">
        </div> */

        const commands = document.createElement("div");
        commands.classList.add("commands")

        const deleteButton = document.createElement('input');
        deleteButton.type = "button";
        deleteButton.name = "delete";
        deleteButton.value = "Delete";
        deleteButton.id = book.title;

        const readButton = document.createElement('input');
        readButton.type = "button";
        readButton.classList.add("read")
        readButton.id = book.title;
        readButton.name = "readOrNot";
        readButton.value = "Read";

        if (!book.read) {
            readButton.classList.remove("read");
            readButton.classList.add("unread");
            readButton.value = "Unread";
            book.read = undefined;
        }

        commands.appendChild(deleteButton);
        commands.appendChild(readButton);

        newBook.appendChild(newBookCover);
        newBook.appendChild(newBookUnder);
        newBook.appendChild(commands);

        // Now append the newBook element to the DOM, e.g., to a parent container
        document.querySelector('#library').appendChild(newBook); // Example container

        //Link delete buttons
        linkDeleteButtons(book.title);

        readButton.addEventListener("click", function (e) {
            book.toggleReadStatus(e, book.title)

        })

    })



}

function deleteBook(titleToDelete) {
    // Find the index of the book with the matching title
    const bookIndex = myLibrary.books.findIndex(book => book.title === titleToDelete);

    myLibrary.books.splice(bookIndex, 1);
    console.log(`The book titled "${titleToDelete}" has been deleted.`);

    displayBooks();

}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(e.target);
    myLibrary.addBook(new Book(
        data.get("title"),
        data.get("author"),
        data.get("year"),
        data.get("readStatus")
    ))

    document.querySelector("#addBook").reset();

    dialog.close();

    displayBooks()

})




/**
 * DIALOGUE FOR ADDING BOOKS
 */

openDialog.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

/**
 * INITIALISE LIBRARY
 */

displayBooks()

if (myLibrary.books.length === 0) {
    const noBooks = document.createElement('div');
    noBooks.style.paddingTop = "20px";
    noBooks.style.fontWeight = "200";
    noBooks.innerHTML = "<em>No books yet...</em>";
    library.appendChild(noBooks)
}

/**
 * SORT BOOKS
 */

const selectElement = document.querySelector("#sorting");

function getSelectedOption() {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    return selectedOption.id; // Returns the selected <option> element
}

// Example usage
function sortBooks() {
    let orderBy = getSelectedOption();
    if (orderBy === "az") { // SORT A-Z
        myLibrary.books.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        console.log(myLibrary); //SORT Z-A
    } else if (orderBy === "za") {
        myLibrary.books.sort((a, b) => {
            return b.title.localeCompare(a.title);
        });
        console.log(myLibrary);

    } else if (orderBy === "oldnew") {
        myLibrary.books.sort((a, b) => {
            return parseInt(a.date) - parseInt(b.date);
        });
        console.log(myLibrary);

    } else if (orderBy === "newold") {
        myLibrary.books.sort((a, b) => {
            return parseInt(b.date) - parseInt(a.date);
        });

        console.log("Reverse Date Order (Newest First):", myLibrary);
    }
}

selectElement.addEventListener("change", function () {
    sortBooks();
    displayBooks();
})

