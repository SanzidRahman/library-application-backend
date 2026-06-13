import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: String,

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    addresses: [
      {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        district: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);