const bookInput = document.getElementById("BookInput");
const authorInput = document.getElementById("AuthorInput");
const ratingInput = document.getElementById("RatingInput");
const addBookButton = document.getElementById("addBookButton");
const bookList = document.getElementById("bookList");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const yearlyGoal = 20;


// Bücher laden
let books = JSON.parse(localStorage.getItem("books")) || [];


// gespeicherte Bücher anzeigen
books.forEach(book => {
    createBookElement(book);
});

updateProgress();


// Button zum Hinzufügen
addBookButton.addEventListener("click", addBook);


// Buch hinzufügen
function addBook() {

    const bookName = bookInput.value.trim();
    const authorName = authorInput.value.trim();
    const rating = ratingInput.value;


    if (bookName === "" || authorName === "") {
        return;
    }


    const book = {
        title: bookName,
        author: authorName,
        rating: rating
    };


    books.push(book);

    saveBooks();

    createBookElement(book);

    updateProgress();


    // Eingaben zurücksetzen
    bookInput.value = "";
    authorInput.value = "";
    ratingInput.selectedIndex = 0;
}



// Buch in Liste erstellen
function createBookElement(book) {

    const li = document.createElement("li");


    li.textContent = `${book.title} - ${book.author} ${book.rating}`;


    const deleteButton = document.createElement("button");

    deleteButton.textContent = "🗑️";


    deleteButton.addEventListener("click", function () {


        books = books.filter(b =>
            !(b.title === book.title &&
              b.author === book.author &&
              b.rating === book.rating)
        );


        saveBooks();

        li.remove();

        updateProgress();

    });


    li.appendChild(deleteButton);

    bookList.appendChild(li);

}



// Bücher speichern
function saveBooks() {

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

}



// Fortschritt aktualisieren
function updateProgress() {

    const percentage = Math.min(
        (books.length / yearlyGoal) * 100,
        100
    );


    progressBar.style.width = percentage + "%";


    progressText.textContent =
        `${books.length} / ${yearlyGoal} Bücher (${Math.round(percentage)}%)`;


    // Ziel erreicht
    if (books.length >= yearlyGoal) {

        progressText.textContent =
            "🎉 Jahresziel erreicht! 50 / 50 Bücher";

    }

}
