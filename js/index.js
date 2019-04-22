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
let allBooks = [];
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
        deleter(event.target.parentElement.id);
        document.getElementById(event.target.parentElement.id).remove();
        for (let i = 0; i < allBooks.length; i++) {
            document.getElementById("all-books").children[i].id = i + "";
        }
        console.log(document.getElementById("all-books"));
    }
});
let onLoadSet = () => {
    allBooks = JSON.parse(localStorage.getItem("books"));
    let allBooksLength = allBooks.length;
    for (let i = 0; i < allBooksLength; i++) {
        let book = new Book(allBooks[i].title, allBooks[i].author, allBooks[i].genre, allBooks[i].frontCoverSrc, allBooks[i].backCoverSrc);
        book.visualConstruct();
    }
    for (let i = 0; i < allBooks.length; i++) {
        document.getElementById("all-books").children[i].id = i + "";
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