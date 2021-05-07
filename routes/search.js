const express = require('express');
const router = express.Router();
// const { csrf, csrfProtection, bcrypt, check, validationResult, asyncHandler } = require("../lib/util")
// bring in the podcasts model here:

const { asyncHandler, csrf } = require("../lib/util")
const { logoutUser } = require("../auth");
const { apiKey } = require('../config');
const unirest = require("unirest");
const baseUrl = 'https://listen-api.listennotes.com/api/v2';

router.get("/:searchterm", asyncHandler(async (req, res) => {
    let searchParam = req.params.searchterm;
    let url = `${baseUrl}/search?q=${searchParam}&sort_by_date=0&type=podcast&offset=0&len_min=10&len_max=30&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0`

    const response = await unirest.get(url)
    .header('X-ListenAPI-Key', apiKey)
    let searchresults = response.toJSON();
    searchresults = searchresults.body.results
    // console.log("THIS IS THE searchResults+++++++++++++++++++++++++++++", searchresults)
    res.json(searchresults)
}))


module.exports = router;