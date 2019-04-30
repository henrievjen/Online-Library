class Book {
    private title: string;
    public author: string;
    public genre: string;
    private frontCoverSrc: string;
    private backCoverSrc: string;

    constructor(title: string, author: string, genre?: string, frontCoverSrc?, backCoverSrc?) {
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

        if(this.frontCoverSrc || this.backCoverSrc) {
            book.setAttribute("title", titleAndAuthor);
            if(this.genre) {
                book.setAttribute("title", titleAndAuthorAndGenre);
            }
        }

        if(this.frontCoverSrc) {
            let frontCover = document.createElement("img");
            frontCover.src = this.frontCoverSrc;
            book.append(frontCover);
        }
        else if(this.backCoverSrc) {
            let backCover = document.createElement("img");
            backCover.src = this.backCoverSrc;
            book.append(backCover);
        }
        else {
            book.setAttribute("class", "border border-dark p-2");
            book.append(titleAndAuthor);
            if(this.genre) {
                book.append("\n" + "Genre: " + this.genre);
            }
        }
        
        let closeButtonDiv = document.createElement("section");
        closeButtonDiv.setAttribute("id", "delete-book-div");
        closeButtonDiv.setAttribute("class", "bg-primary");
        closeButtonDiv.setAttribute("data-toggle", "modal");
        closeButtonDiv.setAttribute("data-target", "#book-info-modal");
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
        catch(err) {
            allBooks = [];
            allBooks.push(this);
            localStorage.setItem("books", JSON.stringify(allBooks));
        }
    }
}