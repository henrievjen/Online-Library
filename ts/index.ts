// Array containing all books, held in localStorage
let allBooks = [];

// Settings Object
let settings = undefined;

let setBgColor = (bgColor: string) => {
    switch(bgColor) {
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
    let title = (<HTMLInputElement>document.getElementById("title")).value;
    let author = (<HTMLInputElement>document.getElementById("author")).value;
    let genre = (<HTMLInputElement>document.getElementById("genre")).value;

    let book = new Book(title, author, genre, frontCoverSrc, backCoverSrc);
    book.pushbooks();

    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("author")).value = "";
    (<HTMLInputElement>document.getElementById("genre")).value = "";

    book.visualConstruct();

    if(frontCoverSrc) {
        (<HTMLElement>document.getElementById("front-cover-visual").children[0]).style.display = "block";
        (<HTMLElement>document.getElementById("front-cover-visual").children[1]).style.display = "block";
        (<HTMLElement>document.getElementById("front-cover-visual")).removeChild((<HTMLElement>document.getElementById("front-cover-visual").children[2]));
    }
    if(backCoverSrc) {
        (<HTMLElement>document.getElementById("back-cover-visual").children[0]).style.display = "block";
        (<HTMLElement>document.getElementById("back-cover-visual").children[1]).style.display = "block";
        (<HTMLElement>document.getElementById("back-cover-visual")).removeChild((<HTMLElement>document.getElementById("back-cover-visual").children[2]));
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
        let sureDelete = confirm("Are you sure you want to delete this book? All content will be lost.");

        if(sureDelete) {
            deleter((<HTMLElement>event.target).parentElement.id);
            document.getElementById((<HTMLElement>event.target).parentElement.id).remove();
            for(let i = 0; i < allBooks.length; i++) {
                document.getElementById("all-books").children[i].id = i + "";   
            }
        }
    }
});

$('#settings-modal').on('hidden.bs.modal', () => {
    // Clear library name value
    (<HTMLInputElement>document.getElementById("library-name")).value = "";

    // Clear library owner value
    (<HTMLInputElement>document.getElementById("library-owner")).value = "";
});


document.getElementById("settings-gear").addEventListener('click', () => {
    document.getElementById("background-color-button").innerHTML = settings.backgroundColor;
});

document.getElementById("save-settings").addEventListener('click', () => {
    settings.backgroundColor = document.getElementById("background-color-button").innerHTML;
    
    setBgColor(settings.backgroundColor);

    localStorage.setItem("settings", JSON.stringify(settings));

    if((<HTMLInputElement>document.getElementById("library-name")).value.trim() != "") {
        settings.libraryName = (<HTMLInputElement>document.getElementById("library-name")).value;
        document.getElementById("library-name-text").innerHTML = settings.libraryName;
    }

    if((<HTMLInputElement>document.getElementById("library-owner")).value.trim() != "") {
        settings.libraryOwner = (<HTMLInputElement>document.getElementById("library-owner")).value;
        document.getElementById("library-owner-text").innerHTML = settings.libraryOwner;
    }
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