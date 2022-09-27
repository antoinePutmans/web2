const target = document.querySelector('.pixel');
let count = document.querySelector('#countor');
let timerDoc = document.querySelector('#timer');
let targetsBySecondsDoc = document.querySelector('#targetPerSeconds')

let lives = 3; 
let countor = 0; 
let timer  = 0;

firstPosition();

target.addEventListener('mouseover',startGame);
target.addEventListener('mouseover',changePosition); 


function timeResfresh(){
    timer++;
    timerDoc.innerText = timer;
    let targetsBySeconds = countor/timer;
    targetsBySecondsDoc.innerText = targetsBySeconds;
    console.log(countor/timer);

}

function loosingHp(){
    lives--;
}

function firstPosition(){
    let randomleft = getRandomInt(20,screen.width-100);
    let randombottom = getRandomInt(20,screen.height-200);
    target.style.left = ""+randomleft+"px"; 
    target.style.bottom = ""+randombottom+"px"; 
}

function changePosition(){ 
    let randomleft = getRandomInt(20,screen.width-100);
    let randombottom = getRandomInt(20,screen.height-200);
    target.style.left = ""+randomleft+"px"; 
    target.style.bottom = ""+randombottom+"px"; 
    countor++; 
    count.innerText=countor;

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function startGame(){
    target.removeEventListener('mouseover',startGame);
    setInterval(timeResfresh, 1000);
}

