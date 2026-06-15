import Book from "../models/bookSchema.js"

export const searchBooks = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(200).json({
                success: true,
                data: [],
            });
        }

        const books = await Book.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { isbn: { $regex: q, $options: "i" } },
            ],
        })
            .populate("author", "name")
            .populate("publisher", "name")
            .limit(10)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to search books",
        });
    }
};