import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // 🔥 important for search
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },

    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      index: true,
    },

    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
      index: true,
    },

    publicationYear: {
      type: Number,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      index: true,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    discountPrice: {
      type: Number,
      index: true,
    },

    stock: {
      type: Number,
      default: 0,
      index: true,
    },

    sold: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book