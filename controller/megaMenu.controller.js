import Book from "../models/bookSchema.js";

export const getMegaMenu = async (req, res) => {
    try {
        // ক্যাটাগরি অনুযায়ী গ্রুপ
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
                    category: { $first: "$category.name" },
                    books: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            author: "$author",
                            publisher: "$publisher",
                        },
                    },
                },
            },
        ]);

        // লেখক অনুযায়ী গ্রুপ
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
                    author: { $first: "$author.name" },
                    books: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            category: "$category",
                            publisher: "$publisher",
                        },
                    },
                },
            },
        ]);

        // প্রকাশক অনুযায়ী গ্রুপ
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
                    publisher: { $first: "$publisher.name" },
                    books: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            category: "$category",
                            author: "$author",
                        },
                    },
                },
            },
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
