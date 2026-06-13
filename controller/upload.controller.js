import cloudinary from "../config/cloudinary.js";

export const uploadBookImage = async (
  req,
  res
) => {
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "library/books",
    }
  );

  res.json(result);
};