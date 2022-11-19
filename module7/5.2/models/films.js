const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
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

function readAllFilms(minimumDuration) {
  const films = parse(jsonDbPath, defaultFilms);

  const orderByDuration = minimumDuration ?? undefined;

  if (!orderByDuration) return films;

  const duration = parseInt(minimumDuration, 10);

  const orderedFilms = [...films].filter((element) => element.duration >= (duration, 10));

  return orderedFilms;
}

function readOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, defaultFilms);
  const indexOfFilmFound = films.findIndex((pizza) => pizza.id === idNumber);
  if (indexOfFilmFound < 0) return undefined;

  return films[indexOfFilmFound];
}

function createOneFilm(title, duration, budget,link) {
  const films = parse(jsonDbPath, defaultFilms);

  const createdFilm = {
    id: getNextId(),
    duration,
    title:escape(title),
    budget,
    link
  };

  films.push(createdFilm);

  serialize(jsonDbPath, films);

  return createdFilm;
}

function getNextId() {
  const films = parse(jsonDbPath, defaultFilms);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneFilm(id) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, defaultFilms);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedFilms = films.splice(foundIndex, 1);
  const deletedFilm = deletedFilms[0];
  serialize(jsonDbPath, films);

  return deletedFilm;
}

function updateOneFilm(id, propertiesToUpdate) {
  const idNumber = parseInt(id, 10);
  const films = parse(jsonDbPath, defaultFilms);
  const foundIndex = films.findIndex((film) => film.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};
