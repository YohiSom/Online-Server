import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middelware/errorMiddleware.js";

connectDb();

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
