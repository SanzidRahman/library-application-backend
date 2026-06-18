import Author from "../models/authorSchema.js";
import Category from "../models/categorySchema.js";
import Publisher from "../models/publishirSchema.js";


export const getFilters = async (req, res) => {
    try {
        const [categories, authors, publishers] = await Promise.all([
            Category.find().select("_id name").sort({ name: 1 }).lean(),
            Author.find().select("_id name").sort({ name: 1 }).lean(),
            Publisher.find().select("_id name").sort({ name: 1 }).lean(),
        ]);

        return res.status(200).json({
            success: true,
            data: {
                categories,
                authors,
                publishers,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to load filters",
        });
    }
};