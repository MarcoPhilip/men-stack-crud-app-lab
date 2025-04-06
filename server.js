
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require('express');
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 
//npm i moment for date formatting
const moment = require('moment');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); 

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


const Shoe = require("./models/shoes.js");

// GET the /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// GET the /shoes/new
app.get("/shoes/new", (req,res) => {
    res.render("sneakers/new.ejs");
});

// GET the /shoes/:id/edit (show a form to edit a shoe)
app.get("/shoes/:shoeId/edit", async (req, res) => {
    //find the shoe by id from database
    const foundShoe = await Shoe.findById(req.params.shoeId);
    //render the page
    res.render("sneakers/edit.ejs", {
        shoe: foundShoe,
    });
});

// GET the /shoes/:id (show/display a shoe by id)
app.get("/shoes/:shoeId", async (req, res) => {
    //get the shoe by id from database
    const foundShoe = await Shoe.findById(req.params.shoeId);
    //format the date
    foundShoe.formattedDate = moment(foundShoe.releaseDate).format('MM/DD/YYYY');
    //render the page
    res.render("sneakers/show.ejs", {
        shoe: foundShoe,
    });
});

// PUT the /shoes/:id (update a specific shoe by id/ UPDATE the shoebyId that is submitted from the EDIT page)
app.put("/shoes/:shoeId", async (req, res) => {
    //update the fruit from database
    await Shoe.findByIdAndUpdate(req.params.shoeId, req.body);
    //redirect to the show page and see the updates
    res.redirect(`/shoes/${req.params.shoeId}`);
});

// DELETE the /plants/:id (delete a specific shoe by id)
app.delete("/shoes/:shoeId", async (req,res) => {
    //find the shoe by id and delete
    await Shoe.findByIdAndDelete(req.params.shoeId);
    //redirect back to shoe index page
    res.redirect("/shoes");
})

// POST the /shoes
app.post("/shoes", async (req, res) => {
    await Shoe.create(req.body);
    res.redirect("/shoes");
});

// GET the /shoes
app.get("/shoes", async (req, res) => {
    const allShoes = await Shoe.find();
    res.render("sneakers/index.ejs", {
        shoes: allShoes
    });
});


// App LISTEN on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});