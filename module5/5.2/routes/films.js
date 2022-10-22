const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} = require('../models/films');

const router = express.Router();

/* Read all the films from the menu
   GET /films?order=title : ascending order by title
   GET /films?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const allFilms = readAllFilms(req?.query['minimum-duration']);

  return res.json(allFilms);
});

// Read the film identified by an id in the menu
router.get('/:id', (req, res) => {
  const foundFilm = readOneFilm(req.params.id);
  if (!foundFilm) return res.sendStatus(404);

  return res.json(foundFilm);
});

// Create a film to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
  const createdfilm = createOneFilm(title, duration,budget,link);

  return res.json(createdfilm);
});

// Delete a film from the menu based on its id
router.delete('/:id', (req, res) => {
  const deletedfilm = deleteOneFilm(req.params.id);

  if (!deletedfilm) return res.sendStatus(404);

  return res.json(deletedfilm);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

 

  const updatedfilm = updateOneFilm(req.params.id, { title, duration,budget,link});

  if (!updatedfilm) return res.sendStatus(404);

  return res.json(updatedfilm);
});

module.exports = router;
