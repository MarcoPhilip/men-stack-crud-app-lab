
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const express = require('express');
const mongoose = require("mongoose"); // require package

const app = express();
app.use(express.urlencoded({ extended: false }));

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

// GET the /shoes
app.get("/shoes", async (req, res) => {
    const allShoes = await Shoe.find();
    res.render("sneakers/index.ejs", {
        shoes: allShoes
    });
});

// GET the /shoes/new
app.get("/shoes/new", (req,res) => {
    res.render("sneakers/new.ejs");
});

// POST the /shoes
app.post("/shoes", async (req, res) => {
    await Shoe.create(req.body);
    res.redirect("/shoes");
});

// GET the /shoes/:id (show/display a shoe by id)


// GET the /shoes/:id/edit (show a form to edit a shoe)


// PUT the /shoes/:id (update a specific shoe by id)


// DELETE the /plants/:id (delete a specific shoe by id)




// App LISTEN on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});