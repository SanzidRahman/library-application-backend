import Author from "../models/authorSchema.js";


export const createAuthors = async (req, res) => {
  try {
    const authors = await Author.create(req.body);

    res.status(201).json({
      success: true,
      data: authors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    res.status(200).json({
      success: true,
      count: authors.length,
      data: authors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getCategoryById = async (req, res) => {
//   try {
//     const authors = await Author.findById(req.params.id);

//     if (!authors) {
//       return res.status(404).json({
//         success: false,
//         message: "Author not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: authors,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateCategory = async (req, res) => {
//   try {
//     const authors = await Author.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       data: authors,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const deleteCategory = async (req, res) => {
//   try {
//     await Author.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Author deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };