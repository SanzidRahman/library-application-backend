// external import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// internal Import
import ConnectionDB from './config/dbConfig.js'
import categoryRoutes from "../backend/routes/category.routes.js"
import authorRoutes from "./routes/author.routes.js";
import publisherRoutes from "./routes/publisher.routes.js";
import bookRoutes from "./routes/book.routes.js";
import megamenu from "./routes/megamenu.routes.js";
import searchBook from "./routes/searchBook.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import filterRoutes from "./routes/filter.routes.js";
// import publicRoute from './routes/publicRoute.js'
// import authRoute from './routes/authRoutes.js'
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import reviewRoutes from "./routes/review.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import wishlistRoutes from "./routes/wishlist.routes.js";
// import couponRoutes from "./routes/coupon.routes.js";
// import orderRoutes from "./routes/order.routes.js";
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

const app = express();
app.use(express.json());
await ConnectionDB();
const PORT = process.env.PORT
app.use(cookieParser(process.env.COOKIE_SECRET));


//Cors Approval
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/mega-menu", megamenu);
app.use("/api/search", searchBook);
app.use("/api/media", mediaRoutes);
app.use("/api/filters", filterRoutes);
// app.use("/api/auth", authRoute);
// app.use("/", publicRoute);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/orders", orderRoutes);


// error handler
app.use(notFoundHandler);
app.use(errorHandler);

// Port
app.listen(PORT, () => {
  console.log(`The app listening on port ${PORT}`);
});
