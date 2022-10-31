import { clearPage } from "../../utils/render";

const HomePage = () => {
  try {
    clearPage();
    jokeGenerator();    
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

  function jokeGenerator(){
const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const submit = document.createElement('input');
  submit.value = 'Generate a joke';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', generateAJoke);
} 

async function generateAJoke(e) {
  e.preventDefault();

  try{
    const main = document.querySelector('main');
    const response = await fetch('https://v2.jokeapi.dev/joke/Dark?type=single');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const joke = await response.json();
    const newJoke = document.createElement('p');
    newJoke.innerText = joke.joke;
    console.log(newJoke);
    main.appendChild(newJoke);
  } catch(err){
    console.error('generateJoke::error: ', err);
    throw err;
  }


} 


export default HomePage;
