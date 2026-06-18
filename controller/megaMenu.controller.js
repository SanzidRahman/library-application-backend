import Book from "../models/bookSchema.js";

export const getMegaMenu = async (req, res) => {
    try {
        const categories = await Book.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            { $unwind: "$category" },
            {
                $group: {
                    _id: "$category._id",
                    name: { $first: "$category.name" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { name: 1 } },
        ]);

        const authors = await Book.aggregate([
            {
                $lookup: {
                    from: "authors",
                    localField: "author",
                    foreignField: "_id",
                    as: "author",
                },
            },
            { $unwind: "$author" },
            {
                $group: {
                    _id: "$author._id",
                    name: { $first: "$author.name" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { name: 1 } },
        ]);

        const publishers = await Book.aggregate([
            {
                $lookup: {
                    from: "publishers",
                    localField: "publisher",
                    foreignField: "_id",
                    as: "publisher",
                },
            },
            { $unwind: "$publisher" },
            {
                $group: {
                    _id: "$publisher._id",
                    name: { $first: "$publisher.name" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { name: 1 } },
        ]);

        res.json({
            success: true,
            data: {
                categories,
                authors,
                publishers,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};