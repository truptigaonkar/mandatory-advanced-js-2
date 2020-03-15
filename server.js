const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('joi');
const uuid = require('uuid/v4');

const MAX_NUMBER_OF_MOVIES = 20;
const UUID_REGEX = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;

const schema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .max(40)
    .required(),
  description: Joi.string()
    .min(1)
    .max(300)
    .required(),
  director: Joi.string()
    .min(1)
    .max(40)
    .required(),
  rating: Joi.number()
    .min(0.0)
    .max(5.0)
    .required(),
  id: Joi.string().regex(UUID_REGEX),
});

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let movies = [];

app.get('/movies', (req, res) => {
  return res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(x => x.id === req.params.id);

  if (!movie) {
    return res.status(404).json({
      status: 'error',
      details: 'Not found',
    });
  }

  return res.json(movie);
});

app.post('/movies', (req, res) => {
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).json(result.error.details);
  }

  const movie = {
    ...req.body,
    id: uuid(),
  };

  movies = [...movies, movie];

  if (movies.length > MAX_NUMBER_OF_MOVIES) {
    movies = movies.slice(movies.length - MAX_NUMBER_OF_MOVIES);
  }

  return res.status(201).json(movie);
});

app.put('/movies/:id', (req, res) => {
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).json({
      status: 'error',
      details: result.error.details,
    });
  }

  const index = movies.findIndex(x => x.id === req.params.id);

  if (index < 0) {
    return res.status(404).json({
      status: 'error',
      details: 'Not found',
    });
  }

  const movie = {
    ...req.body,
    id: req.params.id,
  };

  movies = [...movies.slice(0, index), movie, ...movies.slice(index + 1)];

  return res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const index = movies.findIndex(x => x.id === req.params.id);

  if (index < 0) {
    return res.status(404).json({
      status: 'error',
      details: 'Not found',
    });
  }

  movies = [...movies.slice(0, index), ...movies.slice(index + 1)];

  return res.status(204).send();
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(5000, () => console.log('Listening on port 5000'));
