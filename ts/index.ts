// Array containing all books, held in localStorage
let allBooks = [];

let selectedBook: string = undefined;

// Settings Object
let settings = undefined;

let hasCover: Boolean = undefined;

let setBgColorHead = (bgColor: string): void => {
    switch(bgColor) {
        case "Light Grey":
            document.getElementById("jumbotron").style.backgroundColor = "rgb(231, 231, 231)";
            break;
        case "Grey":
            document.getElementById("jumbotron").style.backgroundColor = "rgb(201, 201, 201)";
            break;
    }
};

let setBgColor = (bgColor: string): void => {
    switch(bgColor) {
        case "White":
            if(document.body.style.backgroundImage) {
                document.body.style.background = "none";
                (<HTMLElement>document.getElementsByClassName("add-book-div")[0]).style.borderColor = "#aaa";
            }
            document.body.style.backgroundColor = "rgb(255, 255, 255)";
            break;
        case "Grey":
            if(document.body.style.backgroundImage) {
                document.body.style.background = "none";
                (<HTMLElement>document.getElementsByClassName("add-book-div")[0]).style.borderColor = "#aaa";
            }
            document.body.style.backgroundColor = "rgb(220, 219, 226)";
            break;
        case "Light Blue":
            if(document.body.style.backgroundImage) {
                document.body.style.background = "none";
                (<HTMLElement>document.getElementsByClassName("add-book-div")[0]).style.borderColor = "#aaa";
            }
            document.body.style.backgroundColor = "rgb(236, 244, 255)";
            break;
        case "Carpet":
            document.body.style.backgroundImage = "url('images/carpet-background.jpg";
            (<HTMLElement>document.getElementsByClassName("add-book-div")[0]).style.borderColor = "#fff";
            break;
        case "Wood":
            document.body.style.backgroundImage = "url('images/wood-background.jpg";
            (<HTMLElement>document.getElementsByClassName("add-book-div")[0]).style.borderColor = "#fff";
            break;
    }
};


let deleter = (num): void => {
    allBooks.splice(num, 1);
    localStorage.setItem("books", JSON.stringify(allBooks));
};


let frontCoverVisual = document.getElementById("front-cover-visual");
let backCoverVisual = document.getElementById("back-cover-visual");

let frontCoverSrc: string = undefined;
let backCoverSrc: string = undefined;

frontCoverVisual.addEventListener('click', (): void => {
    document.getElementById("front-cover").click();
});

backCoverVisual.addEventListener('click', (): void => {
    document.getElementById("back-cover").click();
});


document.getElementById("add-book-form").addEventListener('submit', (event): void => {
    event.preventDefault();
    let title: string = (<HTMLInputElement>document.getElementById("title")).value;
    let author: string = (<HTMLInputElement>document.getElementById("author")).value;
    let genre: string = (<HTMLInputElement>document.getElementById("genre")).value;

    let book: Book = new Book(title, author, genre, frontCoverSrc, backCoverSrc);
    book.pushbooks();

    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("author")).value = "";
    (<HTMLInputElement>document.getElementById("genre")).value = "";

    book.visualConstruct();

    if(frontCoverSrc) {
        (<HTMLElement>frontCoverVisual.children[0]).style.display = "block";
        (<HTMLElement>frontCoverVisual.children[1]).style.display = "block";
        (<HTMLElement>frontCoverVisual).removeChild((<HTMLElement>frontCoverVisual.children[2]));
    }
    if(backCoverSrc) {
        (<HTMLElement>backCoverVisual.children[0]).style.display = "block";
        (<HTMLElement>backCoverVisual.children[1]).style.display = "block";
        (<HTMLElement>backCoverVisual).removeChild((<HTMLElement>backCoverVisual.children[2]));
    }

    frontCoverSrc = undefined;
    backCoverSrc = undefined;

    for(let i = 0; i < allBooks.length; i++) {
        document.getElementById("all-books").children[i].id = i + "";   
    }
});

document.addEventListener('click', (event) => {
    let times = document.createElement("span");
    times.innerHTML = "&times;";

    if((<HTMLElement>event.target).innerHTML == times.innerHTML) {
        let sureDelete: Boolean = confirm("Are you sure you want to delete this book? All content will be lost.");

        if(sureDelete) {
            deleter((<HTMLElement>event.target).parentElement.id);
            document.getElementById((<HTMLElement>event.target).parentElement.id).remove();
            for(let i = 0; i < allBooks.length; i++) {
                document.getElementById("all-books").children[i].id = i + "";   
            }
        }
    }

    // When click on a book
    if((<HTMLElement>event.target).id == "delete-book-div") {
        let times = document.createElement("span");
        times.innerHTML = "&times;";

        let textId = (<HTMLElement>event.target).parentElement.id;
        let textIdText = document.getElementById(textId).innerText;
        
        if(textIdText == times.innerHTML) {
            textIdText = document.getElementById(textId).title;
        }

        let title = textIdText.substring(7, textIdText.indexOf("Author: ")).trim();
        document.getElementById("book-info-modal-label").innerText = title;
        selectedBook = (<HTMLElement>event.target).parentElement.id;

        if(textIdText.indexOf("Genre: ") == -1) {
            let author: string = undefined;

            if(textIdText.endsWith(times.innerHTML)) {
                author = textIdText.substring(document.getElementById("book-info-modal-label").innerText.length + 16, textIdText.length - 1).trim();
            }
            else {
                author = textIdText.substring(document.getElementById("book-info-modal-label").innerText.length + 16).trim();
            }
    
            (<HTMLInputElement>document.getElementById("modal-author")).value = author;

            (<HTMLInputElement>document.getElementById("modal-genre")).value = "";
        }
        else {
            let author: string = textIdText.substring(document.getElementById("book-info-modal-label").innerText.length + 16, textIdText.indexOf("Genre: ")).trim();;
            let genre: string = undefined;

            if(textIdText.endsWith(times.innerHTML)) {
                genre = textIdText.substring(title.length + author.length + 23, textIdText.length - 1).trim();
            }
            else {
                genre = textIdText.substring(title.length + author.length + 23).trim();
            }
            
            (<HTMLInputElement>document.getElementById("modal-author")).value = author;
            (<HTMLInputElement>document.getElementById("modal-genre")).value = genre;
        }

        if(allBooks[selectedBook].ddc) {
            (<HTMLInputElement>document.getElementById("modal-ddc")).value = allBooks[selectedBook].ddc;
        }
        else {
            (<HTMLInputElement>document.getElementById("modal-ddc")).value = "";
        }

        if(allBooks[selectedBook].frontCoverSrc) {
            hasCover = true;

            (<HTMLElement>document.getElementById("front-cover-visual-book").children[0]).style.display = "none";
            (<HTMLElement>document.getElementById("front-cover-visual-book").children[1]).style.display = "none";

            let picture = document.createElement("img");
            picture.setAttribute("id", "book-cover-image");
            picture.src = allBooks[selectedBook].frontCoverSrc;
            document.getElementById("front-cover-visual-book").appendChild(picture);
        }

        if(allBooks[selectedBook].backCoverSrc) {
            hasCover = true;

            (<HTMLElement>document.getElementById("back-cover-visual-book").children[0]).style.display = "none";
            (<HTMLElement>document.getElementById("back-cover-visual-book").children[1]).style.display = "none";

            let picture = document.createElement("img");
            picture.setAttribute("id", "book-cover-image");
            picture.src = allBooks[selectedBook].backCoverSrc;
            document.getElementById("back-cover-visual-book").appendChild(picture);
        }

        if(!(allBooks[selectedBook].frontCoverSrc || allBooks[selectedBook].backCoverSrc)) {
            hasCover = false;
        }
    }
});

// Clear Book Author
document.getElementById("delete-book-author").addEventListener('click', () => {
    (<HTMLInputElement>document.getElementById("modal-author")).value = "";
});

// Clear Book Genre
document.getElementById("delete-book-genre").addEventListener('click', () => {
    (<HTMLInputElement>document.getElementById("modal-genre")).value = "";
});

// Clear Book DDC
document.getElementById("delete-book-ddc").addEventListener('click', () => {
    (<HTMLInputElement>document.getElementById("modal-ddc")).value = "";
});


$('#settings-modal').on('hidden.bs.modal', () => {
    // Clear library name value
    (<HTMLInputElement>document.getElementById("library-name")).value = "";

    // Clear library owner value
    (<HTMLInputElement>document.getElementById("library-owner")).value = "";
});


// Click Settings Gear
document.getElementById("settings-gear").addEventListener('click', () => {
    document.getElementById("background-color-button").innerText = settings.backgroundColor;
    document.getElementById("background-color-heading-button").innerText = settings.backgroundColorHeading;

    if(settings.libraryNameShow) {
        (<HTMLInputElement>document.getElementById("library-name")).value = settings.libraryName;
    }

    if(settings.libraryOwnerShow) {
        (<HTMLInputElement>document.getElementById("library-owner")).value = settings.libraryOwner;
    }

    if(document.getElementById("library-name-text").innerText != "Online Library") {
        document.getElementById("delete-library-name").style.display = "inline";
    }

    if(document.getElementById("library-owner-text").innerText != "Create a custom library") {
        document.getElementById("delete-library-owner").style.display = "inline";
    }
});


// Delete Library Name
document.getElementById("delete-library-name").addEventListener('click', () => {
    document.getElementById("delete-library-name").style.display = "none";
    (<HTMLInputElement>document.getElementById("library-name")).value = "";
});

// Delete Library Owner
document.getElementById("delete-library-owner").addEventListener('click', () => {
    document.getElementById("delete-library-owner").style.display = "none";
    (<HTMLInputElement>document.getElementById("library-owner")).value = "";
});

// Delete all books
document.getElementById("delete-all-books-button").addEventListener('click', () => {
    let deleteAllBooks: Boolean = confirm("Are you sure you want to delete all your books?");

    if(deleteAllBooks) {
        localStorage.setItem("books", JSON.stringify([]));
        onLoadSet();
        setTimeout(() => {
            location.reload();
        }, 200);
    }
});

// Delete all data
document.getElementById("delete-all-data-button").addEventListener('click', () => {
    let deleteAllData: Boolean = confirm("Are you sure you want to delete all your date? Note: everything will be deleted.");

    if(deleteAllData) {
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

    if((<HTMLInputElement>document.getElementById("library-name")).value.trim() != "") {
        settings.libraryName = (<HTMLInputElement>document.getElementById("library-name")).value.trim();
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

    if((<HTMLInputElement>document.getElementById("library-owner")).value.trim() != "") {
        settings.libraryOwner = (<HTMLInputElement>document.getElementById("library-owner")).value.trim();
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


// Save Book
document.getElementById("save-book").addEventListener('click', (event) => {

    // Author value required
    if((<HTMLInputElement>document.getElementById("modal-author")).value.trim() != "") {
        document.getElementById("save-book").setAttribute("data-dismiss", "modal");
        (<HTMLInputElement>document.getElementById("modal-author")).style.borderColor = "inherit";

        allBooks[selectedBook].author = (<HTMLInputElement>document.getElementById("modal-author")).value.trim();
        allBooks[selectedBook].genre = (<HTMLInputElement>document.getElementById("modal-genre")).value.trim();
        allBooks[selectedBook].ddc = (<HTMLInputElement>document.getElementById("modal-ddc")).value.trim();
        
        if(allBooks[selectedBook].frontCoverSrc || allBooks[selectedBook].frontCoverSrc) {
            if(allBooks[selectedBook].genre) {
                (<HTMLElement>document.getElementById("all-books")).children[selectedBook].title = "Title: " + allBooks[selectedBook].title + "\n" + "Author: " + allBooks[selectedBook].author + "\n" + "Genre: " + allBooks[selectedBook].genre;
            }
            else {
                (<HTMLElement>document.getElementById("all-books")).children[selectedBook].title = "Title: " + allBooks[selectedBook].title + "\n" + "Author: " + allBooks[selectedBook].author;
            }  
        }
        else {
            if(allBooks[selectedBook].genre) {
                document.getElementById(selectedBook).innerHTML = "Title: " + allBooks[selectedBook].title + "<br>" + "Author: " + allBooks[selectedBook].author + "<br>" + "Genre: " + allBooks[selectedBook].genre + "<section id='delete-book-div' class='bg-primary' data-toggle='modal' data-target='#book-info-modal'></section>" + "<section title='Delete Book' id='delete-book' class='text-center text-white'>×</section>";
            }
            else {
                document.getElementById(selectedBook).innerHTML = "Title: " + allBooks[selectedBook].title + "<br>" + "Author: " + allBooks[selectedBook].author + "<section id='delete-book-div' class='bg-primary' data-toggle='modal' data-target='#book-info-modal'></section>" + "<section title='Delete Book' id='delete-book' class='text-center text-white'>×</section>";
            }   
        }

        // Adds front or back cover to book without cover
        if(hasCover === false && (frontCoverSrc || backCoverSrc)) {
            if(frontCoverSrc) {
                allBooks[selectedBook].frontCoverSrc = frontCoverSrc;
            }

            if(backCoverSrc) {
                allBooks[selectedBook].backCoverSrc = backCoverSrc;
            }

            allBooks[selectedBook].visualConstruct();

            document.getElementById("all-books").removeChild(document.getElementById("all-books").children[parseInt(selectedBook)]);
            document.getElementById("all-books").children[selectedBook].id = selectedBook;
        }

        localStorage.setItem("books", JSON.stringify(allBooks))
    }
    else {
        document.getElementById("save-book").removeAttribute("data-dismiss");
        (<HTMLInputElement>document.getElementById("modal-author")).style.borderColor = "#f00";
        selectedBook = undefined;
    }

});

$('#book-info-modal').on('hidden.bs.modal', () => {
    (<HTMLElement>document.getElementById("front-cover-visual-book").children[0]).style.display = "block";
    (<HTMLElement>document.getElementById("front-cover-visual-book").children[1]).style.display = "block";

    (<HTMLElement>document.getElementById("back-cover-visual-book").children[0]).style.display = "block";
    (<HTMLElement>document.getElementById("back-cover-visual-book").children[1]).style.display = "block";

    if(document.getElementById("front-cover-visual-book").children[2]) {
        document.getElementById("front-cover-visual-book").removeChild(document.getElementById("front-cover-visual-book").children[2]);
    }

    if(document.getElementById("back-cover-visual-book").children[2]) {
        document.getElementById("back-cover-visual-book").removeChild(document.getElementById("back-cover-visual-book").children[2]);
    }

    frontCoverSrc = undefined;
    backCoverSrc = undefined;
});

document.getElementById("front-cover-visual-book").addEventListener("click", () => {
    document.getElementById("front-cover-book").click();
});

document.getElementById("back-cover-visual-book").addEventListener("click", () => {
    document.getElementById("back-cover-book").click();
});