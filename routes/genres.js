const express = require('express');
const apiKey = process.env.LISTEN_API_KEY
const unirest = require('unirest');
const router = express.Router();
const baseUrl = 'https://listen-api.listennotes.com/api/v2'
const { User, Podcast, Genre, Podshelf, Review, Shelf } = require('../db/models');
const { csrf, csrfProtection, bcrypt, check, validationResult, asyncHandler } = require("../lib/util")


router.get('/:id', csrfProtection, asyncHandler(async (req, res) => {
    const genreId = req.params.id;
    
      let result = await unirest.get(`${baseUrl}/best_podcasts?genre_id=${genreId}&page=2&region=us&safe_mode=0`).header('X-ListenAPI-Key',apiKey)
      result = await result.toJSON()
      let podcastList = result.body.podcasts
    
      let genre = {title:result.body.name, podcasts: podcastList}
      
    res.render('genre', { genre, csrfToken: req.csrfToken() });
}))

//genre pug mixin hits this route which then hits /podcasts/:id
router.get('/podcasts/:id', csrfProtection, asyncHandler(async (req, res) => {
    res.redirect(`/podcasts/${podcast.id}`);
}))

module.exports = router;