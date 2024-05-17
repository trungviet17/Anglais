let cardContainer = document.querySelector("#FC");
let front = document.querySelector("#front");
let back = document.querySelector("#back");
const resetBtn = document.querySelector('#reset');
const backBtn = document.querySelector('#goBack');
const forwardBtn = document.querySelector('#goForward');
const shuffleBtn = document.querySelector('#shuffle');
const title = document.querySelector("#headerText");
const count = document.querySelector('#current');
const total = document.querySelector('#total');
let currentSide = "front"; //or 'back'.
let currentCard = 0;
let cards = JSON.parse(localStorage.getItem('cards'));
let currentSet = localStorage.getItem('currentSet');
title.textContent = localStorage.getItem('currentTitle');


//This function update flashcard.html
function loadFlashCards(){
    
    let term =  Object.keys(cards[currentCard])[0];
    let definition = cards[currentCard][term];
    front.textContent = term;
    back.textContent = definition;
    count.textContent = currentCard + 1 +'/';
    total.textContent =  cards.length;
}
//Flashcard functions.
function flip(){
    if(currentSide == 'front'){
        currentSide = 'back'
        cardContainer.style.transform = "rotateY(180deg)";       
    }
    else{
        currentSide = 'front';
        cardContainer.style.transform = "rotateY(0deg)";
    }
}

function reset(){
    currentCard = 0;
    currentSide = "front";
    loadFlashCards();
}

function goBack(){
    if(currentCard > 0){
        currentCard -=1;
        if(currentSide === "back"){
            flip();
        }
        loadFlashCards();
    }
}
function goForward(){
    if(currentCard < cards.length - 1){
        currentCard +=1;
        if(currentSide === "back"){
            flip();
        }
        loadFlashCards();
    }
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

resetBtn.addEventListener('click', reset);
backBtn.addEventListener('click',goBack);
forwardBtn.addEventListener('click', goForward);
shuffleBtn.addEventListener('click', () => {
    cards = shuffle(cards);
    reset();
});
cardContainer.addEventListener('click',flip);

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }
    else if (event.code === "Space"){
        flip();
    } else if (event.code === "ArrowLeft"){
        goBack();
    } else if (event.code === "ArrowRight"){
        goForward();
    }
    event.preventDefault();
  }, true);



loadFlashCards();