// external import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// internal Import
import ConnectionDB from './config/dbConfig.js'
import categoryRoutes from "./routes/category.routes.js";
import authorRoutes from "./routes/author.routes.js";
import publisherRoutes from "./routes/publisher.routes.js";
import bookRoutes from "./routes/book.routes.js";
import megamenu from "./routes/megamenu.routes.js";
import searchBook from "./routes/searchBook.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import filterRoutes from "./routes/filter.routes.js";
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

const app = express();
app.use(express.json());
await ConnectionDB();
const PORT = process.env.PORT
app.use(cookieParser(process.env.COOKIE_SECRET));


//Cors Approval

app.use(cors({
  origin: [
    process.env.CORS_ORIGIN,
    process.env.VERCEL_ORIGIN

  ],
  credentials: true
}));

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


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});


// error handler
app.use(notFoundHandler);
app.use(errorHandler);




// Port
app.listen(PORT, () => {
  console.log(`The app listening on port ${PORT}`);
});
