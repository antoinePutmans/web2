const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  main.appendChild(pageTitle);
};

const renderImage = (wrapper, url, id, height) => {
  const image = new Image(); // or document.createElement('img');
  image.src = url;
  image.height = height;
  if (id) image.id = id;
  wrapper.appendChild(image);
}


export { clearPage, renderPageTitle, renderImage };
