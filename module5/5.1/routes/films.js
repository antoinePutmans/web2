/* eslint-disable consistent-return */
const express = require('express');

const { isValidHttpUrl } = require('../helpers');

const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname}/../data/films.json`;

const router = express.Router();

const FILMS = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    duration: 152,
    budget: 125,
    link: 'https://fr.wikipedia.org/wiki/Harry_Potter_à_l%27école_des_sorciers_(film)',
  },
  {
    id: 2,
    title: 'Forrest Gump',
    duration: 142,
    budget: 55,
    link: 'https://en.wikipedia.org/wiki/Forrest_Gump',
  },
];

// Read all the films from the collection
router.get('/', (req, res) => {
  const orderByDuration = req?.query['minimum-duration'] // ces "?" représentent la nullité ou non des parameters
    ? req.query['minimum-duration'] // ce "?" est un opérateur ternaire
    : undefined;

  const filmList = parse(jsonDbPath, FILMS);

  if (orderByDuration) {
    const filmsOrdered = [...filmList].filter(
      (element) => element.duration >= parseInt(req.query['minimum-duration'], 10)
    );
    return res.json(filmsOrdered);
  }
  return res.json(filmList);
  // le ?? renvoie l'opérande de droite si gauche est NULL ou UNDEFINED.
});

router.get('/:id', (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;

  const films = parse(jsonDbPath, FILMS);
  if (!id) return res.send('Index not Found');

  const foundIndex = films.findIndex((film) => film.id === parseInt(id, 10));
  if (foundIndex < 0) res.sendStatus(404);

  const filmById = films[foundIndex];

  return res.json(filmById);
});

// Create a film that will be added to the collection.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  const films = parse(jsonDbPath, FILMS);

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
  if (parseInt(duration, 10) <= 0 || parseInt(budget, 10) <= 0) return res.sendStatus(400);
  if (!isValidHttpUrl(link)) return res.sendStatus(400);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex((movie) => movie.id === parseInt(req.params.id, 10));

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];
  serialize(jsonDbPath, films);
  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if (
    (!title && !duration && !budget && !link) ||
    title?.length === 0 ||
    (parseInt(duration, 10) <= 0 && parseInt(budget, 10) <= 0) ||
    !isValidHttpUrl(link)
  )
    return res.sendStatus(400);
  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex((film) => film.id === parseInt(req.params.id, 10));

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

    serialize(jsonDbPath,films);

  res.json(updatedFilm);
});

module.exports = router;
