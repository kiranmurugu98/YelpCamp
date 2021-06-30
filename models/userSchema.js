let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let passlocmongoose = require('passport-local-mongoose');


let userSchema = new Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    }
})

userSchema.plugin(passlocmongoose)
module.exports = mongoose.model('User', userSchema);