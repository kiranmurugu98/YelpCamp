//require the neede
let express = require('express');
let router = express.Router();
let User = require('../models/userSchema')
let wrapAsync = require('../helpers/trycatch');
let passport = require('passport');
let user = require('../controllers/users')


//grouping modles
router.route('/register')

    .get(user.newuserform)
    .post(wrapAsync(user.newregister))

router.route('/login')
    .get(user.loginform)
    .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), user.logincredits)


//register a new user
//router.get('/register', user.newuserform)

//router.post('/register', wrapAsync(user.newregister))

//login 
//router.get('/login', user.loginform)
//default from passport
//router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), user.logincredits)
//logout 
router.get('/logout', user.logout)

module.exports = router;