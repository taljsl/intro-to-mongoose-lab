const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const Profiles = mongoose.model('Profile', profileSchema)

module.exports = Profiles