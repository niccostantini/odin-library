const myLibrary = [

    // { title:"Gone with the Wind?", author: "Bree Zee", date: "2024"},
    // { title:"Byte Me?", author: "Chip L. O’Geek", date: "2023"},
    // { title: "Sofa, So Good", author: "Lou N. Geste", date: "2022"},
    // { title: "Java the Cup", author: "Mocha Latté", date: "2024" }

];


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

function Book(title, author, date) {
  this.title = title;
  this.author = author;
  this.date = date;
}

function displayBooks() {

    while (library.firstChild) {
        library.removeChild(library.lastChild);
      }

    myLibrary.forEach((book) => {
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
    readButton.name = "readStutus";
    readButton.value = "Read";
    readButton.id = book.pages;

    commands.appendChild(deleteButton);
    commands.appendChild(readButton);

    newBook.appendChild(newBookCover);
    newBook.appendChild(newBookUnder);
    newBook.appendChild(commands);

    // Now append the newBook element to the DOM, e.g., to a parent container
    document.querySelector('#library').appendChild(newBook); // Example container
    }  )
}


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    myLibrary.push(new Book(
        data.get("title"),
        data.get("author"),
        data.get("year")
    ))

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