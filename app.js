const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phraseUl = document.querySelector("#phrase ul");
const btnReset = document.querySelector(".btn__reset");
const phrases = ['I like food', 'The sun is out', 'What is the purpose', 'The power of the sun', 'Hooookkkkkkkaaaaaahhh ahahahahahahahah'];
const phraseArray = getRandomPhraseAsArray(phrases);


btnReset.addEventListener('click', e => {
    overlay.style.display = "none"
});

let missed = 0;


function getRandomPhraseAsArray(arr) {
    let random = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[random].toLowerCase();
    let splitPhrase = randomPhrase.split('');
    return splitPhrase;
}

// Simple console log to check if it worked.
// console.log(getRandomPhraseAsArray(phrases))

function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        const createLi = document.createElement("li");
        createLi.textContent = arr[i];
        phraseUl.appendChild(createLi);
        if (arr[i] >= 'A' && arr[i] <= "Z" || arr[i] >= 'a' && arr[i] <= 'z'){
            createLi.className = "letter";
        } else {
            createLi.className = "space";
        }
    }
}

addPhraseToDisplay(phraseArray);

function checkLetter(button){
    let letter = document.querySelectorAll(".letter");
    let match = null;
    let selectLi = document.querySelectorAll("li");
    for (let i = 0; i < selectLi.length; i++){
        if (button.textContent === selectLi[i].textContent.toLowerCase()){
            selectLi[i].classList.add('show');
            match = button.textContent;
        }
    }
    return match
}

qwerty.addEventListener("click", (e) => {
    let btn = e.target;
    if(btn.tagName === "BUTTON"){
        btn.disabled = true;
        btn.className = "chosen";
        let letterFound = checkLetter(btn);

        if (letterFound === null) {
            const lost = document.querySelectorAll(".tries img")[missed];
            lost.src="images/lostHeart.png";
            missed++
        }
    }
    checkWin();
});

function checkWin(){
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    let title = document.querySelector('.title');
    if (letter.length === show.length){
        overlay.className = 'win';
        title.textContent = 'You won OMG YOUR INSANE IN THE MEMBRAIN';
        overlay.style.display = "flex";
        btnReset.style.display = 'none';
    } else if ( missed > 4 ) {
        overlay.className = 'lose';
        title.textContent = 'You lost YOUR ACTUALLY SMALL BRAIN ';
        overlay.style.display = 'flex';
        btnReset.style.display = 'none';
    }
}