

function start(){
  let textEnteredLength = testArea.value.length;
  if(textEnteredLength === 0){
    timerRun = setInterval(runTimer,10);
  }
  console.log(textEnteredLength);
}

function leadingZero(time){
  if(time <= 9){
    time = "0" + time;
  }
  return time;
}

function runTimer(){
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  timer[3]++;
  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
  timer[2] = Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000))
  theTimer.innerHTML = currentTime;

}

function spellCheck(){
  let textEntered = testArea.value;
  let compareText = testQuote.substring(0,textEntered.length);
  if (textEntered == testQuote) {
    testArea.style.borderColor = "green";
    stopTimer();
  } else {
    if (textEntered == compareText) {
      testArea.style.borderColor = "green";
      quote.setAttribute("data-before",textEntered);
      quote.setAttribute("data-after", testQuote.substring(textEntered.length, testQuote.length));


    } else {
      testArea.style.borderColor = "red";
    }
  }
}

function stopTimer(){
  clearInterval(timerRun);
  testArea.readOnly = true;
  var conTime = timer[3]/100;
  theTimer.style.color = "red";
  modal.style.display = "block";
  var numWords = testQuote.match(/(\w+)/g).length;
  console.log("The number of words are" + numWords);
  console.log((numWords/conTime)*60);
  var speed = (numWords/conTime)*60;
  if (speed > 41.4) {
    resultdes.innerHTML = "Your WPM is above average."
    resultdes.style.color = "green"
  } else {
    resultdes.innerHTML = "Your WPM is below average."
    resultdes.style.color = "red"
  }
  wpm.innerHTML = Math.floor(speed);
}



var conTime;

var testQuote;
const url ='https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=displayQuote';
fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => testQuote = data.content)
  .then(() => console.log(testQuote))
  //.then(() => quote.innerHTML = testQuote)
  .then(() => quote.setAttribute("data-after", testQuote))




var quote = document.querySelector(".quote");




var timer = [0,0,0,0];
const theTimer = document.querySelector(".timer");
const testArea = document.querySelector(".testArea")
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const wpm = document.getElementById("wpm");
const correctTag = "<div class=\"correct\">";
console.log(correctTag);
const resultdes = document.getElementById("resultdes");
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck,false);
var comTime;
