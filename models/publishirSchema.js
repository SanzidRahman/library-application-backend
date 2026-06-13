import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },


  },
  { timestamps: true }
);


const Publisher = mongoose.models.Publisher || mongoose.model("Publisher", publisherSchema);
export default Publisher
