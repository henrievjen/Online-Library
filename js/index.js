class Book {
    constructor(title, author, genre, frontCoverSrc, backCoverSrc) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.frontCoverSrc = frontCoverSrc;
        this.backCoverSrc = backCoverSrc;
    }
    visualConstruct() {
        let book = document.createElement("div");
        let titleAndAuthor = "Title: " + this.title + "\n" + "Author: " + this.author;
        let titleAndAuthorAndGenre = "Title: " + this.title + "\n" + "Author: " + this.author + "\n" + "Genre: " + this.genre;
        if (this.frontCoverSrc || this.backCoverSrc) {
            book.setAttribute("title", titleAndAuthor);
            if (this.genre) {
                book.setAttribute("title", titleAndAuthorAndGenre);
            }
        }
        if (this.frontCoverSrc) {
            let frontCover = document.createElement("img");
            frontCover.src = this.frontCoverSrc;
            book.append(frontCover);
        }
        else if (this.backCoverSrc) {
            let backCover = document.createElement("img");
            backCover.src = this.backCoverSrc;
            book.append(backCover);
        }
        else {
            book.setAttribute("class", "border border-dark p-2");
            book.append(titleAndAuthor);
            if (this.genre) {
                book.append("\n" + "Genre: " + this.genre);
            }
        }
        let closeButtonDiv = document.createElement("section");
        closeButtonDiv.setAttribute("id", "delete-book-div");
        closeButtonDiv.setAttribute("class", "bg-primary");
        book.appendChild(closeButtonDiv);
        let closeButton = document.createElement("section");
        closeButton.setAttribute("title", "Delete Book");
        closeButton.setAttribute("id", "delete-book");
        closeButton.setAttribute("class", "text-center text-white");
        closeButton.innerHTML = "&times;";
        book.appendChild(closeButton);
        document.getElementById("all-books").appendChild(book);
    }
    pushbooks() {
        try {
            allBooks.push(this);
            localStorage.setItem("books", JSON.stringify(allBooks));
        }
        catch (err) {
            allBooks = [];
            allBooks.push(this);
            localStorage.setItem("books", JSON.stringify(allBooks));
        }
    }
}
// Array containing all books, held in localStorage
let allBooks = [];
// Settings Object
let settings = undefined;
let setBgColorHead = (bgColor) => {
    switch (bgColor) {
        case "Light Grey":
            document.getElementById("jumbotron").style.backgroundColor = "rgb(231, 231, 231)";
            break;
        case "Grey":
            document.getElementById("jumbotron").style.backgroundColor = "rgb(201, 201, 201)";
            break;
    }
};
let setBgColor = (bgColor) => {
    switch (bgColor) {
        case "White":
            document.body.style.backgroundColor = "rgb(255, 255, 255)";
            break;
        case "Grey":
            document.body.style.backgroundColor = "rgb(220, 219, 226)";
            break;
        case "Light Blue":
            document.body.style.backgroundColor = "rgb(236, 244, 255)";
            break;
    }
};
let deleter = (num) => {
    allBooks.splice(num, 1);
    localStorage.setItem("books", JSON.stringify(allBooks));
};
let frontCoverVisual = document.getElementById("front-cover-visual");
let backCoverVisual = document.getElementById("back-cover-visual");
let frontCoverSrc;
let backCoverSrc;
frontCoverVisual.addEventListener('click', () => {
    document.getElementById("front-cover").click();
});
backCoverVisual.addEventListener('click', () => {
    document.getElementById("back-cover").click();
});
document.getElementById("add-book-form").addEventListener('submit', (event) => {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;
    let book = new Book(title, author, genre, frontCoverSrc, backCoverSrc);
    book.pushbooks();
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    book.visualConstruct();
    if (frontCoverSrc) {
        document.getElementById("front-cover-visual").children[0].style.display = "block";
        document.getElementById("front-cover-visual").children[1].style.display = "block";
        document.getElementById("front-cover-visual").removeChild(document.getElementById("front-cover-visual").children[2]);
    }
    if (backCoverSrc) {
        document.getElementById("back-cover-visual").children[0].style.display = "block";
        document.getElementById("back-cover-visual").children[1].style.display = "block";
        document.getElementById("back-cover-visual").removeChild(document.getElementById("back-cover-visual").children[2]);
    }
    frontCoverSrc = undefined;
    backCoverSrc = undefined;
    for (let i = 0; i < allBooks.length; i++) {
        document.getElementById("all-books").children[i].id = i + "";
    }
});
document.addEventListener('click', (event) => {
    let times = document.createElement("span");
    times.innerHTML = "&times;";
    if (event.target.innerHTML == times.innerHTML) {
        let sureDelete = confirm("Are you sure you want to delete this book? All content will be lost.");
        if (sureDelete) {
            deleter(event.target.parentElement.id);
            document.getElementById(event.target.parentElement.id).remove();
            for (let i = 0; i < allBooks.length; i++) {
                document.getElementById("all-books").children[i].id = i + "";
            }
        }
    }
});
$('#settings-modal').on('hidden.bs.modal', () => {
    // Clear library name value
    document.getElementById("library-name").value = "";
    // Clear library owner value
    document.getElementById("library-owner").value = "";
});
// Click Settings Gear
document.getElementById("settings-gear").addEventListener('click', () => {
    document.getElementById("background-color-button").innerText = settings.backgroundColor;
    document.getElementById("background-color-heading-button").innerText = settings.backgroundColorHeading;
    if (settings.libraryNameShow) {
        document.getElementById("library-name").value = settings.libraryName;
    }
    if (settings.libraryOwnerShow) {
        document.getElementById("library-owner").value = settings.libraryOwner;
    }
    if (document.getElementById("library-name-text").innerText != "Online Library") {
        document.getElementById("delete-library-name").style.display = "inline";
    }
    if (document.getElementById("library-owner-text").innerText != "Create a custom library") {
        document.getElementById("delete-library-owner").style.display = "inline";
    }
});
// Delete Library Name
document.getElementById("delete-library-name").addEventListener('click', () => {
    document.getElementById("delete-library-name").style.display = "none";
    document.getElementById("library-name").value = "";
});
// Delete Library Owner
document.getElementById("delete-library-owner").addEventListener('click', () => {
    document.getElementById("delete-library-owner").style.display = "none";
    document.getElementById("library-owner").value = "";
});
// Delete all books
document.getElementById("delete-all-books-button").addEventListener('click', () => {
    let deleteAllBooks = confirm("Are you sure you want to delete all your books?");
    if (deleteAllBooks) {
        localStorage.setItem("books", JSON.stringify([]));
        onLoadSet();
        setTimeout(() => {
            location.reload();
        }, 200);
    }
});
// Delete all data
document.getElementById("delete-all-data-button").addEventListener('click', () => {
    let deleteAllData = confirm("Are you sure you want to delete all your date? Note: everything will be deleted.");
    if (deleteAllData) {
        localStorage.setItem("books", JSON.stringify([]));
        delete settings.libraryName;
        delete settings.libraryOwner;
        delete settings.libraryNameShow;
        delete settings.libraryOwnerShow;
        settings.backgroundColor = "White";
        settings.backgroundColorHeading = "Light Grey";
        localStorage.setItem("settings", JSON.stringify(settings));
        onLoadSet();
        setTimeout(() => {
            location.reload();
        }, 200);
    }
});
// Settings Save
document.getElementById("save-settings").addEventListener('click', () => {
    settings.backgroundColor = document.getElementById("background-color-button").innerHTML;
    settings.backgroundColorHeading = document.getElementById("background-color-heading-button").innerHTML;
    setBgColor(settings.backgroundColor);
    setBgColorHead(settings.backgroundColorHeading);
    localStorage.setItem("settings", JSON.stringify(settings));
    if (document.getElementById("library-name").value.trim() != "") {
        settings.libraryName = document.getElementById("library-name").value.trim();
        document.getElementById("library-name-text").innerText = settings.libraryName;
        settings.libraryNameShow = true;
        localStorage.setItem("settings", JSON.stringify(settings));
    }
    else {
        delete settings.libraryName;
        document.getElementById("library-name-text").innerText = "Online Library";
        settings.libraryNameShow = false;
        localStorage.setItem("settings", JSON.stringify(settings));
    }
    if (document.getElementById("library-owner").value.trim() != "") {
        settings.libraryOwner = document.getElementById("library-owner").value.trim();
        document.getElementById("library-owner-text").innerText = settings.libraryOwner;
        settings.libraryOwnerShow = true;
        localStorage.setItem("settings", JSON.stringify(settings));
    }
    else {
        delete settings.libraryOwner;
        document.getElementById("library-owner-text").innerText = "Create a custom library";
        settings.libraryOwnerShow = false;
        localStorage.setItem("settings", JSON.stringify(settings));
    }
});
let onLoadSet = () => {
    allBooks = JSON.parse(localStorage.getItem("books"));
    let allBooksLength;
    try {
        allBooksLength = allBooks.length;
    }
    catch (err) {
        allBooksLength = 0;
    }
    for (let i = 0; i < allBooksLength; i++) {
        let book = new Book(allBooks[i].title, allBooks[i].author, allBooks[i].genre, allBooks[i].frontCoverSrc, allBooks[i].backCoverSrc);
        book.visualConstruct();
    }
    // Library Name
    try {
        settings = JSON.parse(localStorage.getItem("settings"));
        if (settings.libraryName != undefined) {
            document.getElementById("library-name-text").innerText = settings.libraryName;
        }
        if (settings.libraryNameShow != undefined) {
            document.getElementById("library-name").innerText = settings.libraryName;
        }
    }
    catch (err) {
        document.getElementById("library-name-text").innerText = "Online Library";
    }
    // Library Owner
    try {
        settings = JSON.parse(localStorage.getItem("settings"));
        if (settings.libraryOwner != undefined) {
            document.getElementById("library-owner-text").innerText = settings.libraryOwner;
        }
        if (settings.libraryOwnerShow != undefined) {
            document.getElementById("library-owner").innerText = settings.libraryOwner;
        }
    }
    catch (err) {
        document.getElementById("library-owner-text").innerText = "Create a custom library";
    }
    try {
        for (let i = 0; i < allBooks.length; i++) {
            document.getElementById("all-books").children[i].id = i + "";
        }
    }
    catch (err) {
        // Do nothing
    }
    // Settings Background Color Heading
    try {
        settings = JSON.parse(localStorage.getItem("settings"));
        if (!settings.backgroundColorHeading) {
            settings.backgroundColorHeading = "Light Grey";
        }
        setBgColorHead(settings.backgroundColorHeading);
    }
    catch (err) {
        settings = {
            backgroundColor: "White",
            backgroundColorHeading: "Light Grey"
        };
    }
    // Settings Background Color
    try {
        settings = JSON.parse(localStorage.getItem("settings"));
        setBgColor(settings.backgroundColor);
    }
    catch (err) {
        settings = {
            backgroundColor: "White",
            backgroundColorHeading: "Light Grey"
        };
    }
};
let readImageFront = (input) => {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("front-cover-visual").children[0].style.display = "none";
            document.getElementById("front-cover-visual").children[1].style.display = "none";
            let picture = document.createElement("img");
            picture.setAttribute("id", "book-cover-image");
            picture.src = e.target.result;
            document.getElementById("front-cover-visual").appendChild(picture);
            frontCoverSrc = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
    if (document.getElementById("front-cover-visual").children[2]) {
        document.getElementById("front-cover-visual").removeChild(document.getElementById("front-cover-visual").children[2]);
    }
};
let readImageBack = (input) => {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("back-cover-visual").children[0].style.display = "none";
            document.getElementById("back-cover-visual").children[1].style.display = "none";
            let picture = document.createElement("img");
            picture.setAttribute("id", "book-cover-image");
            picture.src = e.target.result;
            document.getElementById("back-cover-visual").appendChild(picture);
            backCoverSrc = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
    if (document.getElementById("back-cover-visual").children[2]) {
        document.getElementById("back-cover-visual").removeChild(document.getElementById("back-cover-visual").children[2]);
    }
};
//# sourceMappingURL=index.js.map