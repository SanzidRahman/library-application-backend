import { UploadOnCloudinary } from '../config/cloudinaryConfig.js'
import Book from "../models/bookSchema.js"
import Media from "../models/mediaSchema.js"

// Create Books
export const createBooks = async (req, res) => {
  try {
    let pictureId = null;

    if (req.file) {
      const uploadedFile = await UploadOnCloudinary(req.file.path);

      const media = await Media.create({
        url: uploadedFile.url,
        secureUrl: uploadedFile.secure_url,
        resourceType: uploadedFile.resource_type,

      });

      pictureId = media._id;
    }

    const book = await Book.create({
      ...req.body,
      media: pictureId,
    });

    return res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get All Boooks
export const getBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([
      // Join Category
      {
        $lookup: {
          from: "categories", // collection name in MongoDB
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // Join Category
      {
        $lookup: {
          from: "media", // collection name in MongoDB
          localField: "media",
          foreignField: "_id",
          as: "media",
        },
      },
      { $unwind: { path: "$media", preserveNullAndEmptyArrays: true } },

      // Join Author
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },

      // Join Publisher
      {
        $lookup: {
          from: "publishers",
          localField: "publisher",
          foreignField: "_id",
          as: "publisher",
        },
      },
      { $unwind: { path: "$publisher", preserveNullAndEmptyArrays: true } },

      // Shape the response
      {
        $project: {
          _id: 1,
          title: 1,
          publicationYear: 1,
          price: 1,
          discountPrice: 1,
          discountPercentage: 1,
          stock: 1,
          sold: 1,
          createdAt: 1,
          updatedAt: 1,
          category: {
            _id: "$category._id",
            name: "$category.name",
          },
          media: {
            _id: "$media._id",
            url: "$media.url",
            secureUrl: "$media.secureUrl",

          },
          author: {
            _id: "$author._id",
            name: "$author.name",
          },
          publisher: {
            _id: "$publisher._id",
            name: "$publisher.name",
          },
        },
      },
    ]);

    res.json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get Single books
export const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id)
      .populate("author", "name")       // only return author name
      .populate("publisher", "name")    // only return publisher name
      .populate("category", "name")    // only return category name
      .populate("media", "url , secureUrl");

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};









