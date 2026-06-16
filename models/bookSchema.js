import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },

    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
    },

    publicationYear: Number,

    price: {
      type: Number,
      required: true,
    },

    discountPercentage: Number,
    discountPrice: Number,

    stock: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);


const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book
