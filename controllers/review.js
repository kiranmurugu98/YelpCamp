//require the review File
let Review = require('../models/reviewcamp');

//campground file
const Campground = require('../models/campground');


module.exports.createNewReview = async function (req, res) {


    let findcamp = await Campground.findById(req.params.id);
    //console.log(findcamp)
    let review = new Review(req.body)
    //adding the user 
    review.user = req.user._id;
    //console.log(review)
    findcamp.reviews.push(review)
    //console.log(findcamp)
    await review.save();
    await findcamp.save();
    req.flash('success', 'SuccessFully Created A New Review!!')

    res.redirect(`/index/${findcamp._id}`);

}


module.exports.deleteReview = async function (req, res) {
    let { id, aboutId } = req.params;
    //console.log(id);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: aboutId } });
    //console.log(pull)
    await Review.findByIdAndDelete(aboutId);
    //console.log(dle)
    req.flash('success', 'SuccessFully Deleted A Review!!')

    res.redirect(`/index/${id}`);
}