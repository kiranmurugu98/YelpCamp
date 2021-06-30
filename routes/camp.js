//env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}





//defing the index file with render
let express = require('express');
let router = express.Router();
let { campSchema } = require('../joi')
let wrapAsync = require('../helpers/trycatch');
let CustomError = require('../helpers/customerror')
const Campground = require('../models/campground');
let { logIn, isAuth, validatecamp } = require('../loginmiddleware')
let camp = require('../controllers/campground')
let multer = require('multer')
let { storage } = require('../cloudinary')
let upload = multer({ storage })


//grouping the same way
router.route('/')
    .get(wrapAsync(camp.index))
    .post(logIn, upload.array('image'), validatecamp, wrapAsync(camp.createnewcamp))


router.get('/new', logIn, camp.newformcamp)

router.route('/:id')
    .get(wrapAsync(camp.showcamp))
    .put(logIn, isAuth, upload.array('image'), validatecamp, wrapAsync(camp.updatecamp))
    .delete(logIn, isAuth, wrapAsync(camp.deletecamp))


//index file
//router.get('/', wrapAsync(camp.index))
//creating a new data with post method
//validating by jio using Middleware
//router.post('/', logIn, validatecamp, wrapAsync(camp.createnewcamp))
//finding the data using the id
//router.get('/:id', wrapAsync(camp.showcamp))
//editing the data using put method
router.get('/:id/edit', logIn, isAuth, wrapAsync(camp.editform))

//router.put('/:id', logIn, validatecamp, isAuth, wrapAsync(camp.updatecamp))
//delete the file using method override method
//router.delete('/:id', logIn, isAuth, wrapAsync(camp.deletecamp))


module.exports = router;