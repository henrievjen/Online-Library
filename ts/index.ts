let allBooks = [];

let deleter = (num) => {
    allBooks.splice(num, 1);
    localStorage.setItem("books", JSON.stringify(allBooks));
};

let clickX = (times: number) => {
    let imgElem = document.getElementById("all-books").children[times].children[0];

    if(imgElem.tagName == "IMG") {
        document.getElementById("all-books").children[times].children[2].addEventListener('click', () => {
            (<HTMLElement>document.getElementById("all-books").children[times]).style.display = "none";
            deleter(times);
        });   
    }
    else {
        document.getElementById("all-books").children[times].children[1].addEventListener('click', () => {
            (<HTMLElement>document.getElementById("all-books").children[times]).style.display = "none";
            deleter(times);
        });   
    }
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
        clickX(i);
    }
});