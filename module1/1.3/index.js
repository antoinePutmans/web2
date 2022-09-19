let message = document.querySelector('h1');
let clicks = document.querySelector('p');
let numberOfClicks = 0;
let body = document.querySelector('body');

body.addEventListener("click",addClicks);


function messageByClicks(){
    if(numberOfClicks>=5){
        message.innerText = "Bravo, bel échauffement ! ";
    }
    if(numberOfClicks>10){
        message.innerText = "Vous êtes passé maître en l'art du clic ! ";
    }
}

function addClicks(){
    numberOfClicks++; 
    console.log(numberOfClicks);
    clicks.textContent=numberOfClicks; 
    messageByClicks();
}