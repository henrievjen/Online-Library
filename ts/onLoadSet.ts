let onLoadSet = () => {

    allBooks = JSON.parse(localStorage.getItem("books"));

    let allBooksLength: number;
    
    try {
        allBooksLength = allBooks.length;
    }
    catch(err) {
        allBooksLength = 0;
    }

    for(let i = 0; i < allBooksLength; i++) {
        let book: Book = new Book(allBooks[i].title, allBooks[i].author, allBooks[i].genre, allBooks[i].frontCoverSrc, allBooks[i].backCoverSrc);
        book.visualConstruct();
    }

    // Library Name
    try {
        settings = JSON.parse(localStorage.getItem("settings"));

        if(settings.libraryName != undefined) {
            document.getElementById("library-name-text").innerText = settings.libraryName;
        }

        if(settings.libraryNameShow != undefined) {
            document.getElementById("library-name").innerText = settings.libraryName;
        }
    }
    catch(err) {
        document.getElementById("library-name-text").innerText = "Online Library";
    }

    // Library Owner
    try {
        settings = JSON.parse(localStorage.getItem("settings"));

        if(settings.libraryOwner != undefined) {
            document.getElementById("library-owner-text").innerText = settings.libraryOwner;
        }

        if(settings.libraryOwnerShow != undefined) {
            document.getElementById("library-owner").innerText = settings.libraryOwner;
        }
    }
    catch(err) {
        document.getElementById("library-owner-text").innerText = "Create a custom library";
    }

    try {
        for(let i = 0; i < allBooks.length; i++) {
            document.getElementById("all-books").children[i].id = i + "";   
        }
    }
    catch(err) {
        // Do nothing
    }

    // Settings Background Color Heading
    try {
        settings = JSON.parse(localStorage.getItem("settings"));
        if(!settings.backgroundColorHeading) {
            settings.backgroundColorHeading = "Light Grey";
        }
        setBgColorHead(settings.backgroundColorHeading);
    }
    catch(err) {
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
    catch(err) {
        settings = {
            backgroundColor: "White",
            backgroundColorHeading: "Light Grey"
        };
    }
};