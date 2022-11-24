let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let guessInput;
let movesLeft = 5;
let temp = 0;
let game = false;
let items;
let guessLetters = ''
let length;
let count;
let points=0;
moves.innerHTML = movesLeft;
function inputButton() {
  for (let i = 0; i < 26; i++) {
    let inp = document.createElement('input')
    inp.type = 'submit';
    inp.value = letters.charAt(i);
    inp.id = 'j' + i;
    inp.setAttribute('class', 'item')
    inputs.appendChild(inp)
  }
}
inputButton();
//create words and create input field accordingly
let num = 0;
let theWord;
function get_and_set_word(){
async function fetchFunc() {
   let url = 'https://random-word-api.herokuapp.com/word'
    let ri = fetch(url)
  let r1 = await ri;
  return r1.json();
}
fetchFunc().then((val) => {
  theWord = val[0]
})
.then(()=>{
wordArr = theWord.toUpperCase().split('');
createInp();
})
}
get_and_set_word();
function createInp() {
  inputDiv.innerHTML=''
  length = wordArr.length;
  for (let i = 0; i < wordArr.length; i++) {
    let inp = document.createElement('input')
    inp.classList.add('guessInput');
    document.querySelector('#inputDiv').appendChild(inp);
    inp.readOnly=true;
  }
  guessInput = document.querySelectorAll('.guessInput')
  giveHint(guessInput);  
}
function giveHint(hint){
  let r1=Math.floor(Math.random()*(wordArr.length))
  let r2= Math.floor(Math.random()*(wordArr.length))
  while(r1===r2){
    r2= Math.floor(Math.random()*(wordArr.length))
      }
  hint[r1].value=wordArr[r1]
  hint[r2].value=wordArr[r2] 
  hint[r1].classList.add('hint')
  hint[r2].classList.add('hint')
  count=2
}
add_event();
function add_event() {
  items = document.querySelectorAll('.item')
  Array.from(items).forEach((element, index) => {
    element.addEventListener('click', function c() {
      if (!game) {
        temp = 0;
        for (let i = 0; i < wordArr.length; i++) {
          if (element.value === wordArr[i]) {
            element.removeEventListener('click', c);
            temp++;
            count++;
            if(guessInput[i].value!==''){
              count--;
            }
            guessInput[i].value = element.value;
            element.classList.add('afterClick');
            if (temp === 1) {
              movesLeft++;
              moves.innerHTML = movesLeft;
            }
          }
          else {
            element.removeEventListener('click', c);
            element.classList.add('afterClick')
          }
        }
        check();
      }
    })

  })
}
function check() {
  let c = document.querySelectorAll('.warning')
  if (c) {
    movesLeft--;
    moves.innerHTML = movesLeft;
  }
  if (movesLeft < 1) {
    over.innerHTML = 'Game Over';
    game = true;
    replay.style.display = 'initial'
    word.innerHTML = `The word: ${theWord}`
    word.style.display = 'initial'
  }
  setTimeout(() => {
    newWord();
  }, 1000)
}
replay.addEventListener('click', () => {
  location.reload();
})
function newWord() {
  if (length === count) {
    points++;
    score.innerHTML=points;
    inputDiv.innerHTML = 'Correct Guess'
    get_and_set_word();
    wordArr = theWord.split('');
    inputs.innerHTML = ''
    inputButton();
    movesLeft = 5;
    moves.innerHTML = movesLeft;
    game = false;
    add_event();
    Array.from(items).forEach((element) => {
      element.classList.remove('afterClick')
    })
  }
}