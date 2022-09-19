const dateTime = new Date();
const date = dateTime.toLocaleDateString(); 
const time = dateTime.toLocaleTimeString();
console.log(date);
console.log(time);

function addDateTime(message){
    let finalMessage = date + " " + time + " : " + message; 
    return finalMessage;  
}

alert(addDateTime("BONJOUR A TOUS CEUX QUI VERRONT CE MESSAGE")); 
