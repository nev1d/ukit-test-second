let button = document.querySelector("#submitBook")
let author = document.querySelector("#inputAuthor")
let name = document.querySelector("#inputName")
let year = document.querySelector("#inputYear")
let pages = document.querySelector("#inputPages")
let bookList = document.querySelector(".book-list")

let books = []

if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"))
    displayBookList()
}

button.addEventListener("click", function (event) {
    event.preventDefault()
    if (name.value === "" || author.value === "" || pages.value === "" || year.value === "") {
        alert("Заполните все поля.")
    } else {
        const newBook = {
            author: author.value,
            name: name.value,
            year: year.value,
            pages: pages.value,
            edited: false
        }

        if (books.filter(e => e.edited === true).length === 1) {
            books = books.map(function (e) {
                if (e.edited === true) {
                    return {
                        ...newBook
                    }
                } else {
                    return e
                }
            })
        } else {
            if (books.filter(e => !(e.name === name.value && e.author === author.value)).length !== books.length){
                alert("Данная книга уже есть в списке. Отредактируйте ее, если хотите изменить.")
            } else {
                books.push(newBook);
            }
        }

        displayForm()
        displayBookList()
        localStorage.setItem("books", JSON.stringify(books))
    }
})

function displayBookList () {
    let displayBooks = ""
    books.forEach(function (e, i) {

        displayBooks += `
            <div class="card" id="book_${i}">
               <div class="card-body">
                 <h5 class="card-title">${e.author}</h5>
                 <p class="card-text">${e.name}</p>
                 <a href="#" class="btn btn-primary">Удалить</a>
                 <a href="#" class="btn btn-secondary">Редактировать</a>
               </div>
            </div>
        `
    })
    bookList.innerHTML = displayBooks
}

bookList.addEventListener("click", function (event) {
    let author = event.target.parentElement.querySelector(".card-title").innerHTML
    let name = event.target.parentElement.querySelector(".card-text").innerHTML
    if (event.target.classList.contains('btn-primary')) {
        books.forEach(function (e, i) {
            if (e.name === name && e.author === author) {
                books.splice(i, 1)
            }
        })
    } else if (event.target.classList.contains('btn-secondary')) {
        books = books.map(function (e) {
            if (e.name === name && e.author === author) {
                return {
                    ...e,
                    edited: true
                }
            }
            else {
                return {
                    ...e,
                    edited: false
                }
            }
        })
    }
    displayForm()
    displayBookList()
    localStorage.setItem("books", JSON.stringify(books))
})

function displayForm () {
    let editedBook = books.filter(e => e.edited === true)
    if (editedBook.length === 1) {
        name.value = editedBook[0].name
        author.value = editedBook[0].author
        pages.value = editedBook[0].pages
        year.value = editedBook[0].year
    } else {
        name.value = ""
        author.value = ""
        pages.value = ""
        year.value = ""
    }
}
