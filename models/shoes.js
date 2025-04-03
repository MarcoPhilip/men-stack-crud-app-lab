// models/shoes.js

const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
    name: String,
    brand: String,
    type: String,
    releaseDate: Date,
    retailPrice: String,
});

const Shoe = mongoose.model("Shoe", shoeSchema); 

module.exports = Shoe;