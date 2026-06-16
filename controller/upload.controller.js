import { UploadOnCloudinary } from "../config/cloudinaryConfig.js";
import Media from "../models/mediaSchema.js";
import fs from "fs";

export const UploadMedia = async (req, res) => {
  try {
    const picture = req.file;

    if (!picture) {
      return res.status(400).json({
        success: false,
        message: "Picture is required",
      });
    }

    // Upload file to Cloudinary
    const result = await UploadOnCloudinary(picture.path);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
      });
    }

    // Delete local file
    if (fs.existsSync(picture.path)) {
      fs.unlinkSync(picture.path);
    }

    const media = await Media.create({
      url: result.url,
      secureUrl: result.secure_url,
      resourceType: result.resource_type,
    });

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      media,
    });
  } catch (error) {
    console.error("Upload Media Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getMedia = async (req, res) => {
  try {
    const media = await Media.find()

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      media,
    });
  } catch (error) {
    console.error("Upload Media Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}