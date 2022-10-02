import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middelware/errorMiddleware.js";
import serverRoutes from "./routes/serverRoutes.js";
import licenseRoutes from "./routes/licenseRoutes.js";
import availableRoutes from "./routes/availableRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import connectedServerRoutes from "./routes/connectedServerRoute.js";
import removerServerLive from "./routes/removeServerLive.js";
connectDb();

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use("/api/servers", serverRoutes);
app.use("/api/available", availableRoutes);
app.use("/api/licenses", licenseRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/activeLicense", connectedServerRoutes);
app.use("/api/removeLiveServer", removerServerLive);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.set("port", PORT);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
