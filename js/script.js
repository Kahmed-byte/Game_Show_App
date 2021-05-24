// NEEDED ELEMETS FOR HTML!
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const phraseUl = document.querySelector('#phrase ul');
const startbutton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const tries = document.querySelectorAll(".tries img");
const title = document.querySelector("title");


//  STORE THE NR OF TIMES THE PLAYER GUESSED WRONG, START WITH 0
let missed = 0;

// ARRAY FOR THE PHRASES
phrases = ["yesterday is history", 
           "be better", 
           "do good", 
           "live life", 
           "top notch"];

// RETURN A RANDOM PHRASE FROM AN ARRAY
const getRandomPhraseAsArray = arr => {
    let randomnr = Math.floor(Math.random()*arr.length);
    return arr[randomnr];
}
// === CALL getRandomPhraseAsArray AND STORE IT IN VAR === //
let randomPhraseReturned = getRandomPhraseAsArray(phrases);

// ADD THE LETTERS OF STRING TO THE DISPLAY
function addPhraseToDisplay(arr) {
        for (let i = 0; i < arr.length; i++) {
            let letter = arr[i];
            let li = document.createElement("li");
             li.textContent = letter;

             if ( letter !== " ") {
                 li.className = "letter";
             phraseUl.appendChild(li);
             }
             else {
                 li.className = "space";
             phraseUl.appendChild(li);
             }
        }
}
// === CALL THE addPhraseToDisplay FUNCTION === //
addPhraseToDisplay(randomPhraseReturned);

// CHECK IF A LETTER IS IN THE PHRASE
function checkLetter (clickedbutton) {
        let allLi = document.querySelectorAll(".letter");
        let matchFound = null;
        for (let i = 0; i < allLi.length; i++) {
            if (clickedbutton === allLi[i].textContent) {
                allLi[i].classList.add("show");
                matchFound = true;         
            }
        }
        return matchFound; 
}

// CHECK IF THE GAME HAVE BEEN WON OR LOST
const checkWin = () => {
let liLetter = document.querySelectorAll(".letter");
let liShow = document.querySelectorAll(".show");
if (liLetter.length == liShow.length) {
    overlay.className = "win";
    overlay.firstElementChild.textContent = "CONGRATULATIONS YOU WIN"
    overlay.style.display = "flex";
    startbutton.textContent = "RETRY?"
    reset()
}
else if (missed > 4) {
    overlay.className = "lose";
    overlay.firstElementChild.textContent = "SORRY, YOU LOST"
    overlay.style.display = "flex";
    startbutton.textContent = "RETRY?"
    reset()
}}
// RE-START GAME WHEN "RETRY" BUTTON IS CLICKED
function reset() {
    startbutton.textContent = "Play Again";
    missed = 0;
    phraseUl.innerHTML = " ";
    let phraseChoice = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseChoice);
    let chosen = document.querySelectorAll(".chosen");
    for (let i = 0; i < chosen.length; i++) {
      chosen[i].classList.remove("chosen");
      chosen[i].disabled = false;
    }
  
    for (let i = 0; i < tries.length; i++) {
      tries[i].src = "images/liveHeart.png";
    }
  }
// LISTEN FOR THE START GAME BUTTON TO BE PRESSED           
startbutton.addEventListener('click', () => {
         overlay.style.display = "none";
});

// LISTEN FOR THE ONSCREEN KEYBOARD TO BE CLICKED
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        let button = e.target;
        button.className = "chosen";
        button.disabled = true;
       let foundLetter = checkLetter(button.textContent);
    
    if (foundLetter === null) {
      tries[missed].src = "images/lostHeart.png";
      missed++
      checkWin();
    } else {
      checkWin();
}
    }});