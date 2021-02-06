const express = require('express');
const router = express.Router();
const { User, Shelf, Podcast, Genre } = require('../db/models');
const { csrf, csrfProtection, bcrypt, check, validationResult, asyncHandler, createShelves, populateShelves } = require("../lib/util")
const { loginUser, logoutUser } = require("../auth")






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


    const genre_info = await Genre.findAll();
    console.log(genre_info);

    res.render('profile', { csrfToken: req.csrfToken(), name: user_info.dataValues.name, email: user_info.dataValues.email, genre_info: genre_info });
}));












router.post('/', signUpValidator, csrfProtection, asyncHandler(async (req, res) => {
    const validatorErrors = validationResult(req);
    const { email, name, password, confirmPassword } = req.body;
    if (validatorErrors.isEmpty()) {
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
    }
    else {
        const errors = validatorErrors.array().map((error) => error.msg)
        res.render('index', { email, name, errors, csrfToken: req.csrfToken() })
    }
}))


router.get("/login", csrfProtection, (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() })
})

router.post("/login", csrfProtection, loginValidators, asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const validatorErrors = validationResult(req);
    const errors = validatorErrors.array().map((error) => error.msg);
    if (validatorErrors.isEmpty()){
    const user = await User.findOne({ where: { email } });
    const RealPassword = user.hashedPassword.toString();
    const passwordMatch = await bcrypt.compare(password, RealPassword);

        if (passwordMatch ) {
            const userShelves = await populateShelves(user)

            loginUser(req, res, user, userShelves)
            return req.session.save((err) => {
                if (err) {
                    next(err);
                } else {
                    res.redirect("/me")
                }
            })
    } }
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
    // if (error) {
        // next(error)
    // } else {
        res.redirect("/")
    // }
})



router.get('/logout', (req, res) => {
    logoutUser(req, res);
    // if (error) {
        // next(error)
    // } else {
        res.redirect("/")
    // }
})







module.exports = router;
