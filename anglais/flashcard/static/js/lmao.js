class FlipCard {
    constructor() {
        this.frontContent = "Hello";
        this.backContent = "World";
        this.language = "English";
    }
    
    changeContent() {
        if (this.language === "French") {
        this.frontContent = "Bonjour";
        this.backContent = "Monde";
        } else if (this.language === "Chinese") {
        this.frontContent = "你好";
        this.backContent = "世界";
        } else {
        this.frontContent = "Hello";
        this.backContent = "World";
        }
    
        document.getElementById("front-content").innerText = this.frontContent;
        document.getElementById("back-content").innerText = this.backContent;
    }
    }
    
    let card = new FlipCard();
    
    function changeLanguage() {
    let button = document.getElementById("language-button");
    if (button.innerText === "English") {
        button.innerText = "French";
        card.language = "French";
    } else if (button.innerText === "French") {
        button.innerText = "Chinese";
        card.language = "Chinese";
    } else {
        button.innerText = "English";
        card.language = "English";
    }
    card.changeContent();
    }
    
    function changeContent() {
    card.changeContent();
    }