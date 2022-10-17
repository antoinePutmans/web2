var express = require('express');
var router = express.Router();


const FILMS = [
  {
    id: 1,
    title: 'Diable',
    duration: 230 ,
    budget: "100m",
    link: "LocalHelot",
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req?.query?.['minimum-duration']);
  const minimumDuration =
    req?.query['minimum-duration']
    ? req.query['minimum-duration'] 
    : undefined;
  let orderedFilms;

  let minimumDurationInt = parseInt(minimumDuration);

  if(minimumDuration){
    orderedFilms = [...FILMS].filter(a=>a.duration>=minimumDurationInt);
  }
  
 
  res.json(orderedFilms ?? FILMS);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration!== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  console.log(title);
  console.log(duration);
  console.log(budget);
  console.log(link);
  if (!title || !budget || !duration || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  FILMS.push(newFilm);

  res.json(newFilm);
});

router.get('/:id', (req, res) => {

  const indexOfFilms = FILMS.findIndex((films) => films.id == req.params.id);

  if (indexOfFilms < 0) return res.sendStatus(404);

  res.json(FILMS[indexOfFilms]);
});

router.patch('/:id', (req, res) => {

  const title = req?.body?.title;
  const content = req?.body?.content;

  console.log('POST /pizzas');

  if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

  const foundIndex = MENU.findIndex(pizza => pizza.id == req.params.id);

  if (foundIndex < 0 || foundIndex>MENU.length-1) return res.sendStatus(404);

  const updatedPizza = {...MENU[foundIndex], ...req.body};

  MENU[foundIndex] = updatedPizza;

  res.json(updatedPizza);
});


module.exports = router;
