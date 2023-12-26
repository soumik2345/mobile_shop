import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: [true, "Please provide a categoryname"],
  },
  image: {
    type: String,
    required: [true, "Please provide a category image"],
  },
});

const Category =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default Category;
