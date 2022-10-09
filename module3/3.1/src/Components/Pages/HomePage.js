import cpMarvel from '../../img/Marvel_Logo.png'


const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  addImg(cpMarvel,100);
};

function addImg(source,height) {
  const image = new Image(); // or document.createElement('img');
  image.src = source;
  image.height = height;
  const main = document.querySelector('main');
  main.appendChild(image);
};
  

export default HomePage;
