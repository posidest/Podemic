const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const apiKey = process.env.LISTEN_API_KEY
const baseUrl = 'https://listen-api.listennotes.com/api/v2'
const { User, Shelf } = require('../db/models');
const { csrf, csrfProtection, bcrypt, check, validationResult, asyncHandler, createShelves, populateShelves } = require("../lib/util")
const { loginUser, logoutUser } = require("../auth")
const { Client } = require('podcast-api');

const loginValidators = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('You forgot to enter your password!')
];

const signUpValidator = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email address.')
        .isLength({ max: 255 })
        .withMessage('Whoaaa that\'s a long email! Try again.')
        .custom(async email => {
            await User.findOne({
                where: {
                    email: email
                }
            }).then(isEmail => {
                if (isEmail) {
                    return Promise.reject('Email is already in use');
                }
            })
        })
        .withMessage('Email is already in use')
        .isEmail()
        .withMessage('Email must be valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your name.')
        .isLength({ max: 70 })
        .withMessage('Your name is too long!'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a password.'),
    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
        .withMessage('Password confirmation does not match password')
];


router.get('/', csrfProtection, asyncHandler(async(req, res) => {
    const user_id = req.session.auth.userId;
    const user_info = await User.findByPk(user_id);

    // for the demo user -- dont allow them to delete their account
    let isDemo;
    // if they have the demo users email and the same id as the demo user make a boolean to be used in the pug
    if (user_info.dataValues.email === 'test@test.com' && user_id === 1){
        isDemo = true;
    } else {
        isDemo = false;
    }
    
    const users_shelf = await Shelf.findAll({
        where: { userId: user_id },
        order: [
            ['id', 'ASC']]
    });
    
    let result = []

        let thumbsupIcon = '&#128077;'
        let thumbsdownIcon = "&#128078;"
        let currentIcon = "&#127911;"
        let onMyRadarIcon ="&#128064;"
        let mehIcon = "&#128529;"

    for (let i=0; i < users_shelf.length; i++){
        let shelf = users_shelf[i]
        let shelfname = shelf.name.split("+")
        let name = shelfname[0]
        let icon = shelfname[1]
        let basic = false;
        if(shelfname.length===1){
            basic = true;
            if(name === "Current") icon = currentIcon
            else if (name === "Thumbs Up") icon = thumbsupIcon
            else if (name === "Thumbs Down") icon = thumbsdownIcon
            else if (name === "On My Radar") icon = onMyRadarIcon
            else if (name === "Meh") icon = mehIcon
        }

        let currentShelf = {id: shelf.id, title: name, icon:icon, basic:basic}
        let newPodsArray = []
        let podcast;
        for (let j= 0; j< shelf.podcasts.length; j++){
            let pod = shelf.podcasts[j]
            const client = Client({ apiKey: apiKey});
            let response =await client.fetchPodcastById({id: pod.id, sort: 'recent_first',
            }).then((response) => {
                newPodsArray.push(response.data)
  // Get response json data here
//   console.log("THIS IS RESPONSE.DATA",Object.keys(response.data));
                }).catch((error) => {
        console.log(error)
            });
        
            // let podcast = await unirest.get(`${baseUrl}/${pod}?next_episode_pub_date=1479154463000&sort=recent_first`)
            // .header('X-ListenAPI-Key', apiKey)
            // podcast = await podcast.toJSON();
            // podcast = podcast.body
            // console.log("THIS IS POD FROM users.js routes", podcast)
            
        }
        currentShelf.podcasts=newPodsArray
        
        result.push(currentShelf)
    }
    
    // const genre_info = await Genre.findAll();
    let genres=[]
    const client = Client({ apiKey: apiKey });
    let response = await client.fetchPodcastGenres({
        top_level_only: 1,
      }).then((response) => {
        // Get response json data here
        genres.push(...response.data.genres)
    }).catch((error) => {
        console.log(error)
    });
    // const genre_info = await unirest.get(`${baseUrl}/genres?top_level_only=1`)
    //   .header('X-ListenAPI-Key', apiKey)
    //     genre_info.toJSON();
    //     const genres = genre_info.body.genres;
    
    res.render('profile', { csrfToken: req.csrfToken(), isDemo: isDemo, theirId: user_info.dataValues.id, name: user_info.dataValues.name, email: user_info.dataValues.email, genre_info: genres, shelves: result });
}));



router.post('/sign-up', signUpValidator, csrfProtection, asyncHandler(async (req, res) => {
    const { email, name, password, confirmPassword } = req.body;
    const validatorErrors = validationResult(req);
    const errors = validatorErrors.array().map((error) => error.msg);
    if (validatorErrors.isEmpty()) {
        if(password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, name, hashedPassword });
            const userShelves = await createShelves(user)
            loginUser(req, res, user, userShelves)
            return req.session.save((err) => {
                if (err) {
                    next(err)
                } else {
                    res.redirect('/me');
                }
            })
        } else {
            errors.push('Passwords must match.')
            res.render('create-user', {errors, csrfToken: req.csrfToken(), email, name})
        }
    }
    else {
        res.render('create-user', { email, name, errors, csrfToken: req.csrfToken() })
    }
}))

router.get('/sign-up', csrfProtection, (req, res) => {
    res.render("create-user", {csrfToken: req.csrfToken()})
})


router.get("/login", csrfProtection, (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() })
})

router.post("/login", csrfProtection, loginValidators, asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const validatorErrors = validationResult(req);
    const errors = validatorErrors.array().map((error) => error.msg);
    if (validatorErrors.isEmpty()){
    const user = await User.findOne({ where: { email } });
    if(!user) {
        errors.push('The email does not exist in our system!')
        res.render('login', {errors, csrfToken: req.csrfToken()})
    } else {
        const RealPassword = user.hashedPassword.toString();
        const passwordMatch = await bcrypt.compare(password, RealPassword);
    
            if (passwordMatch) {
                const userShelves = await populateShelves(user)
    
                loginUser(req, res, user, userShelves)
                return req.session.save((err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.redirect("/me")
                    }
                })
            } else {
                errors.push('The email password combination does not match!')
                res.render('login', { errors, csrfToken: req.csrfToken(), email})
            }
    }
}

else {
        res.render('login', { errors, csrfToken: req.csrfToken(), email })
    }
            
    
}))


router.post("/demo", csrfProtection, asyncHandler(async(req,res)=>{
    const email = "test@test.com"
    const user = await User.findOne({ where: { email } })
    const userShelves = await populateShelves(user)

    loginUser(req, res, user, userShelves)

    return req.session.save((err) => {
        if (err) {
            next(err);
        } else {
            res.redirect("/me")
        }
    });

}))


router.post('/logout', (req, res) => {
    logoutUser(req, res);
    //  if (error) {
    //      next(error)
    //  } else {
        res.redirect("/")
    //  }
})



router.get('/logout', (req, res) => {
    logoutUser(req, res);
    // if (error) {
    //     next(error)
    // } else {
        res.redirect("/")
    // }
})







module.exports = router;
