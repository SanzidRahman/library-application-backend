import { UploadOnCloudinary } from '../config/cloudinaryConfig.js'
import Book from "../models/bookSchema.js"
import Media from "../models/mediaSchema.js"
import Category from "../models/categorySchema.js"

// Create Books Controller
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

// Boooks Controller / features books
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
            slug: "$category.slug",
          },
          media: {
            _id: "$media._id",
            url: "$media.url",
            secureUrl: "$media.secureUrl",

          },
          author: {
            _id: "$author._id",
            name: "$author.name",
            slug: "$author.slug",

          },
          publisher: {
            _id: "$publisher._id",
            name: "$publisher.name",
            slug: "$publisher.slug",
          },
        },
      },
    ]);

    res.json({ success: true, data: books, message: "Gets Books Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Single book controller
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

// Get AllBooks Controllers
export const GetAllBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      category,
      author,
      publisher,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Author
    if (author) {
      query.author = author;
    }

    // Publisher
    if (publisher) {
      query.publisher = publisher;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.discountPrice = {};

      if (minPrice) {
        query.discountPrice.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        query.discountPrice.$lte =
          Number(maxPrice);
      }
    }

    // Sorting
    let sortOption = {
      createdAt: -1,
    };

    switch (sort) {
      case "price-low":
        sortOption = {
          discountPrice: 1,
        };
        break;

      case "price-high":
        sortOption = {
          discountPrice: -1,
        };
        break;

      case "newest":
        sortOption = {
          createdAt: -1,
        };
        break;

      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "a-z":
        sortOption = {
          title: 1,
        };
        break;

      case "z-a":
        sortOption = {
          title: -1,
        };
        break;

      default:
        break;
    }

    const skip =
      (Number(page) - 1) * Number(limit);

    const totalBooks =
      await Book.countDocuments(query);

    const books = await Book.find(query)
      .populate("category", "name , slug")
      .populate("author", "name , slug")
      .populate("publisher", "name , slug")
      .populate(
        "media",
        "url secureUrl"
      )
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .lean();


    return res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalBooks,
      totalPages: Math.ceil(
        totalBooks / Number(limit)
      ),
      data: books,
      message: "Books fetched successful"
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch books",
    });
  }
};
