// models/shoes.js

const mongoose = require("mongoose");
const moment = require('moment');

const shoeSchema = new mongoose.Schema({
    name: String,
    brand: String,
    type: String,
    releaseDate: {
        type: Date,
        get: function (releaseDate) {
            return moment(releaseDate).format('MM/DD/YYYY');
        },
        set: function (releaseDate) {
            return moment(releaseDate, 'MM/DD/YYYY').toDate();
        },
    },
    retailPrice: String,
});

const Shoe = mongoose.model("Shoe", shoeSchema); 

module.exports = Shoe;