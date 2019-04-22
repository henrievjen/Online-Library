let readImageFront = (input) => {
    if (input.files && input.files[0]) {
        let reader: any = new FileReader();

        reader.onload = (e) => {
            (<HTMLElement>document.getElementById("front-cover-visual").children[0]).style.display = "none";
            (<HTMLElement>document.getElementById("front-cover-visual").children[1]).style.display = "none";

            let picture = document.createElement("img");
            picture.setAttribute("id", "book-cover-image");
            picture.src = e.target.result;
            document.getElementById("front-cover-visual").appendChild(picture);
            frontCoverSrc = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }

    if((<HTMLElement>document.getElementById("front-cover-visual").children[2])) {
        (<HTMLElement>document.getElementById("front-cover-visual")).removeChild((<HTMLElement>document.getElementById("front-cover-visual").children[2]));
    }
};

let readImageBack = (input) => {
    if (input.files && input.files[0]) {
        let reader: any = new FileReader();

        reader.onload = (e) => {
            (<HTMLElement>document.getElementById("back-cover-visual").children[0]).style.display = "none";
            (<HTMLElement>document.getElementById("back-cover-visual").children[1]).style.display = "none";

            let picture = document.createElement("img");
            picture.setAttribute("id", "book-cover-image");
            picture.src = e.target.result;
            document.getElementById("back-cover-visual").appendChild(picture);
            backCoverSrc = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }

    if((<HTMLElement>document.getElementById("back-cover-visual").children[2])) {
        (<HTMLElement>document.getElementById("back-cover-visual")).removeChild((<HTMLElement>document.getElementById("back-cover-visual").children[2]));
    }
};