const myLibrary = [

    { title:"Gone with the Wind?", author: "Bree Zee", date: "2024", read: "on"},
    { title:"Byte Me?", author: "Chip L. O’Geek", date: "2023", read: undefined},
    { title: "Sofa, So Good", author: "Lou N. Geste", date: "2022", read: "on"},
    { title: "Java the Cup", author: "Mocha Latté", date: "2024", read: undefined }

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

function Book(title, author, date, read) {
  this.title = title;
  this.author = author;
  this.date = date;
  this.read = read;
}

function readUnread(readButton, bookTitle) {
    const theButton = readButton.target;
    const book = myLibrary.find(book => book.title === bookTitle);

    if (book.read === 'on') {
        theButton.classList.remove("read");
        theButton.classList.add("unread");
        theButton.value = "Unread";
        book.read = undefined;
    
    }

    else if(!book.read) {
        theButton.classList.remove("unread");
        theButton.classList.add("read");
        theButton.value = "Read";
        book.read = "on";
    }
}

function linkDeleteButtons(id) {
    const deleteButton = document.querySelector(`input[id="${id}"]`);

    deleteButton.addEventListener("click", function(event) {
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
    readButton.classList.add("read")
    readButton.id = book.title;
    readButton.name = "readOrNot";
    readButton.value = "Read";

    if(!book.read) {
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
        readUnread(e, book.title)
    
    })

    })



}

function deleteBook(titleToDelete) {
    // Find the index of the book with the matching title
    const bookIndex = myLibrary.findIndex(book => book.title === titleToDelete);

      myLibrary.splice(bookIndex, 1);
      console.log(`The book titled "${titleToDelete}" has been deleted.`);

      displayBooks();

  }


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    myLibrary.push(new Book(
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

if (myLibrary.length === 0) {
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
function sortBooks(){
    let orderBy = getSelectedOption();
     if (orderBy === "az") { // SORT A-Z
        myLibrary.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        console.log(myLibrary); //SORT Z-A
     } else if (orderBy === "za")  {myLibrary.sort((a, b) => {
        return b.title.localeCompare(a.title);
        });
        console.log(myLibrary);

     } else if (orderBy === "oldnew") {
        myLibrary.sort((a, b) => {
            return parseInt(a.date) - parseInt(b.date);
        });
        console.log(myLibrary);

     } else if (orderBy === "newold") {
        myLibrary.sort((a, b) => {
            return parseInt(b.date) - parseInt(a.date);
        });
        
        console.log("Reverse Date Order (Newest First):", myLibrary);
     }
}

selectElement.addEventListener("change", function() {
    sortBooks();
    displayBooks();
})

