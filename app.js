// REQUIRE ALL THE DEPENDENCIES
const express = require("express"); // CommonJS, the other one (newest) is ESM (EcmaScript Modules) or ES6
const logger = require("morgan");
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Product = require("./models/Product.model");
const Project = require("./models/Project.model");

// initialize the dotenv  to have access to the .env file
require("dotenv").config();

// server initialization
const app = express();

// MIDDLEWARES: is something in the middle. We can trigger whatever we want before we handle the req/res in the route
app.use(logger("dev")); // to see the requests methods in the console
app.use(express.static("public")); // to have a static folder if we need to send files
app.use(express.json()); // to format response to json

// CONNECT WITH OUR MONGODB
mongoose
  .connect(process.env.MONGO_DB)
  .then((res) =>
    console.log("MONGODB connected to the database: ", res.connections[0].name)
  )
  .catch((error) => console.log(error));

app.get("/students", (req, res) => {
  // QUERIES ARE INCLUDED IN THE REQ
  console.log("THIS IS THE QUERY: ", req.query);
  /*
  THE QUERY IS AN OBJECT:
  {
    username: "Lian"
  }
  */
  if (req.query.password) {
    res.status(203).send("Sorry, you are not authorized to look for passwords");
  } else {
    Student.find(req.query)
      .then((data) => res.json(data))
      .catch((error) => res.status(404).send("User not found"));
  }
});

// the order matters if the routes look the same
app.get("/products/stock", (req, res) => {});
// THE PURPOSE OF THIS ROUTE is to get the details of an specific product based based on the ID
app.get("/products/:productId", (req, res) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

// POST REQUEST
app.post("/products", (req, res) => {
  /* const newProduct = {
    name: "Classic Red T-Shirt",
    description: "A timeless red t-shirt with an image of a pan pizza.",
    price: 39.99,
    size: "M",
  }; */
  console.log(req.body);
  Product.create(req.body)
    .then((data) =>
      res.json({ message: "Your product has been created", data })
    )
    .catch((error) => res.json(error));
});

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  Product.findByIdAndDelete(productId)
    .then((data) =>
      res.json({ message: "Your product has been deleted", data })
    )
    .catch((error) => res.json(error));
});

app.put("/products/:productId", (req, res) => {
  const { productId } = req.params;
  Product.findByIdAndUpdate(productId, req.body)
    .then((data) =>
      res.json({ message: "Your product has been updated", data })
    )
    .catch((error) => res.json(error));
});

app.get("/projects", (req, res) => {
  Project.find()
    .populate("owners") // it's going to find each student by their ID
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

// LISTEN TO THE PORT 👂
app.listen(5005, () => {
  console.log("Server listening 👂 on port 5005");
});
