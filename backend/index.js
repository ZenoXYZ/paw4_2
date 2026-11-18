'use strict';

const express = require('express');
const app = express();

// Get joke categories and responds with those
app.get('/jokebook/categories', (req, res) => {
  const categories = require('./data/categories.json');

  res.json(categories);
});

// Get jokes from a joke category and respond with a joke
// from corresponding category
app.get('/jokebook/joke/:category', (req, res) => {
  const categoryName = req.params.category;
  
  try {
    const jokes = require(`./data/${categoryName}.json`);
    
    if (!jokes || jokes.length === 0) {
      return res.status(404).json({ 'error': `no jokes for category ${categoryName}` });
    }

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];

    res.json(randomJoke);
  } catch (error) {
    res.status(404).json({ 'error': `no jokes for category ${categoryName}` });
  }
});

// Get a random joke from any category
app.get('/jokebook/joke', (req, res) => {
  const categories = require('./data/categories.json');

  const categoryIndex = Math.floor(Math.random() * categories.length);

  const categoryName = categories[categoryIndex];
  try {
    const jokes = require(`./data/${categoryName}.json`);

    if (!jokes || jokes.length === 0) {
      return res.status(404).json({'error' : `no jokes for category ${categoryName}`});
    }

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];

    res.json(randomJoke);
  } catch (error) {
    res.status(404).json({ 'error': `no jokes for category ${categoryName}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});