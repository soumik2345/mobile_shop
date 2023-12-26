import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  image: {
    type: String,
    required: [true, "Please provide a image"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  details: {
    type: String,
    required: [true, "Please provide a category"],
  },
  addby: {
    type: String,
    required: [true, "Please provide addby"],
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
