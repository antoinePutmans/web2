const divs = document.querySelectorAll('div');
let colorIndex = 0;
let reverse = false;

startColorChanging();

function startColorChanging() {
    setInterval(colorUp, 2000);

}

function colorUp() {

    disapearColor();
    if (colorIndex === divs.length - 1){
        reverse = true;
    }
    if (colorIndex === 0){
        reverse = false;
    }
    if (reverse) {
        colorIndex--;
    }
    else colorIndex++;
    changeColor();
    
    
}

function changeColor() {
    divs[colorIndex].style.backgroundColor = divs[colorIndex].className;
}

function disapearColor(){
    divs[colorIndex].style.backgroundColor = 'white';
}


