const div = document.querySelector('div');
let count = document.querySelector('#countor');
let countor = 0; 

div.addEventListener('mouseover',changePosition); 

function changePosition(){
 
    let randomleft = getRandomInt(3,screen.width-3);
    let randombottom = getRandomInt(3,screen.height-3);
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