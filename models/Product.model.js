const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  size: { type: String, enum: ["S", "M", "L", "XL"] },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// if we want to export more than one variable we do it inside curly bracket {Product, User, Book, etc}