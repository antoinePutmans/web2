import { clearPage } from '../../utils/render';



const HomePage = async () => {
  try {
    clearPage();

    const response = await fetch('/api/films');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const films = await response.json();

    renderMenuFromString(films);
    makeButtonClickable();
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

function renderMenuFromString(menu) {
  const menuTableAsString = getMenuTableAsString(menu);

  const main = document.querySelector('main');

  main.innerHTML += menuTableAsString;
}

function getMenuTableAsString(menu) {
  const menuTableLines = getAllTableLinesAsString(menu);
  const films = addLinesToTableHeadersAndGet(menuTableLines);
  return films;
}

function addLinesToTableHeadersAndGet(tableLines) {
  const menuTable = `
  <div class="p-5 text-center bg-light">
  <h1 class="mb-3">MyMovies</h1>
  <h5 class="mb-3">Here you can find all of my movies</h5>
  ${tableLines}
  `;
  return menuTable;
}

function getAllTableLinesAsString(listfilms) {
  let filmsLines = `<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Link</th>
      <th scope="col">Duration<br>(min)</th>
      <th scope="col">Budget<br>(million)</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  <tbody>`;

  listfilms?.forEach((film) => {
    filmsLines += `<tr>
      <td scope="row" class="fw-bold text-info" contenteditable="true">${film.title}</td>
      <td class="fw-bold text-info" contenteditable="true"><a href="${film.link}">${film.link}</a></td></td>
      <td class="fw-bold text-info" contenteditable="true">${film.duration}</td>
      <td class="fw-bold text-info" contenteditable="true">${film.budget}</td>
      <td> <button type="button" id="saveButton" data-attribute=${film.id}>Save</button> <button type="button" id="deleteButton">Delete</button></td>
    </tr>`;
  });

  filmsLines +=`</tbody>
  </table>`

  return filmsLines;
}

function makeButtonClickable(){
  const saveButton = document.querySelectorAll('#saveButton');
  const deleteButton = document.querySelectorAll('#deleteButton');
  deleteButton.forEach(
    save=>save.addEventListener(
    'click',deleteMovie
    ))
    saveButton.forEach(
      save=>save.addEventListener(
      'click',saveModificationsMovie
    ))
}

async function deleteMovie(e) {
  const id = parseInt(e.target.parentElement.children[0].getAttribute('data-attribute'), 10);
  const response = await fetch(`/api/films/${id}`, {
   method: 'DELETE',
 });

 if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
 
 window.location.reload();
};
 
async function saveModificationsMovie(e) {
  const film = e.target.parentElement.parentElement;
  const id = parseInt(e.target.parentElement.children[0].getAttribute('data-attribute'), 10);
  console.log(e.target.parentElement)
  const response = await fetch(`/api/films/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: film.children[0].innerText,
      link: film.children[1].children[0].innerText,
      duration: parseInt(film.children[2].innerText, 10),
      budget: parseInt(film.children[3].innerText, 10), 
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  window.location.reload();
};



export default HomePage;