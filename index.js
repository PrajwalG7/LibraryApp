showBooks();

// Add Scroll Bar  
let tableBody = document.getElementById('tableBody');
tableBody.style.overflow = 'auto';



//Search by book name
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value; 
  let bookCards = document.getElementsByClassName("bookCard");
  Array.from(bookCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("td")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block"
      element.style.display=""
      
    } else {
      element.style.display = "none";  
    }
  });
});
 


// Show Books  
function showBooks() {

    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let addRow = "";
    bookObj.forEach(function (element, index) {
        addRow += `<tr class="bookCard">
                    <th scope="row">${index+1}</th>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    if (bookObj.length == 0) {
        tableBody.innerHTML = "";
    }else{
        tableBody.innerHTML = addRow;
    }
}

// Delete Book  
function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let bookName = bookObj[index].name;
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let msg = document.getElementById('msg');
    let boldText = 'Deleted';
    msg.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>${boldText}: </strong> The book ${bookName} has been deleted from the library
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(() => {
        msg.innerHTML = "";
    }, 3000);
    showBooks();
}

// Create a Book Constructor
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
      

        let getBooks = localStorage.getItem('books');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBooks);
        }

        bookObj.push(book);
        localStorage.setItem('books', JSON.stringify(bookObj));
        showBooks();

    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('msg');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        } else {
            boldText = 'Error';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}: </strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }
}

// Get the libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);


function libraryFormSubmit(e) {

    e.preventDefault();

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);


    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been added successfully');
    } else {
        display.show('danger', 'Sorry you cannot add this book');
    }

}

