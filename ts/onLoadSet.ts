let onLoadSet = () => {
    
    allBooks = JSON.parse(localStorage.getItem("books"));

    let allBooksLength = allBooks.length;
    for(let i = 0; i < allBooksLength; i++) {
        let book = new Book(allBooks[i].title, allBooks[i].author, allBooks[i].genre, allBooks[i].frontCoverSrc, allBooks[i].backCoverSrc);
        book.visualConstruct();
    }

    for(let i = 0; i < allBooks.length; i++) {
        clickX(i);
    }
    
};