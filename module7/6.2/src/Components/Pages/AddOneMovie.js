import Navigate from '../Router/Navigate';

const AddOneMovie = () => {
  const main = document.querySelector('main');
  main.innerHTML = ""; 
  main.innerHTML+=(addForm());
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const submit = document.createElement('input');
  submit.value = 'Go back to HomePage';
  submit.className = 'btn btn-secondary mt-3';
  submit.addEventListener('click', () => {
    Navigate('/');
  });

  main.appendChild(submit);
}

function addForm() {
  const form = `<form>
  <div class="container">
  <div class="form-check">
    <label>Title</label>
    <input type="text" class="form-control">
  </div>
  <div class="form-check">
    <label>Duration</label>
    <input type="text" class="form-control">
  </div>
  <div class="form-check">
    <label>Budget</label>
    <input type="text" class="form-control" placeholder="in millions">
  </div>
  <div class="form-check">
    <label>Link</label>
    <input type="text" class="form-control">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>`;

return form;
}

export default AddOneMovie;
