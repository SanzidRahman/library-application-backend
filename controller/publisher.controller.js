import Publisher from "../models/publishirSchema.js"


export const createPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.create(req.body);

    res.status(201).json({
      success: true,
      data: publisher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.find();

    res.status(200).json({
      success: true,
      count: publisher.length,
      data: publisher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//   try {
//     const publisher = await Publisher.findById(req.params.id);

//     if (!publisher) {
//       return res.status(404).json({
//         success: false,
//         message: "Publisher not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: publisher,
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
//     const publisher = await Publisher.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       data: publisher,
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
//     await Publisher.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Publisher deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };