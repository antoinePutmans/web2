const div = document.querySelector('.pixel');
let count = document.querySelector('#countor');
let timerDoc = document.querySelector('#timer');
let targetsBySecondsDoc = document.querySelector('#targetPerSeconds')
let countor = 0; 
let timer  = 0;

firstPosition();
div.addEventListener('mouseover',changePosition); 
setInterval(timeResfresh, 1000);


function timeResfresh(){
    timer++;
    timerDoc.innerText = timer;
    let targetsBySeconds = countor/timer;
    targetsBySecondsDoc.innerText = targetsBySeconds;
    console.log(countor/timer);

}

function firstPosition(){
    let randomleft = getRandomInt(20,screen.width-100);
    let randombottom = getRandomInt(20,screen.height-200);
    div.style.left = ""+randomleft+"px"; 
    div.style.bottom = ""+randombottom+"px"; 
}

function changePosition(){ 
    let randomleft = getRandomInt(20,screen.width-100);
    let randombottom = getRandomInt(20,screen.height-200);
    console.log(randomleft);
    console.log(randombottom);
    div.style.left = ""+randomleft+"px"; 
    div.style.bottom = ""+randombottom+"px"; 
    countor++; 
    count.innerText=countor;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

