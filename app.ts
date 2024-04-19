import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./api-documentation.json";
import cors from "cors";

import indexRouter from "./routes/index";

const mongoDb =
  "mongodb+srv://admin:dudu@cluster0.3wz8lmy.mongodb.net/my-blog?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", indexRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
export default app;
