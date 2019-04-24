let onLoadSet = () => {

    allBooks = JSON.parse(localStorage.getItem("books"));

    let allBooksLength;
    
    try {
        allBooksLength = allBooks.length;
    }
    catch(err) {
        allBooksLength = 0;
    }

    for(let i = 0; i < allBooksLength; i++) {
        let book = new Book(allBooks[i].title, allBooks[i].author, allBooks[i].genre, allBooks[i].frontCoverSrc, allBooks[i].backCoverSrc);
        book.visualConstruct();
    }

    try {
        for(let i = 0; i < allBooks.length; i++) {
            document.getElementById("all-books").children[i].id = i + "";   
        }

        try {
            settings = JSON.parse(localStorage.getItem("settings"));
            
            setBgColor(settings.backgroundColor);
        }
        catch(err) {
            settings = {
                backgroundColor: "White"
            };
        }
    }
    catch(err) {
        try {
            settings = JSON.parse(localStorage.getItem("settings"));
            
            setBgColor(settings.backgroundColor);
        }
        catch(err) {
            settings = {
                backgroundColor: "White"
            };
        }
    }
};