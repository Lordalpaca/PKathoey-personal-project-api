import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./src/routes/auth.js";
import { error } from "./src/utils/error.js";
import { notFound } from "./src/utils/notFound.js";
import apiRouter from "./src/routes/api.js";

const app = express();
const PORT = process.env.PORT || 8888;

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/auth", authRouter);
app.use("/api", apiRouter)

//Globl Error Handler
app.use(error);

//Not Found Handler
app.use(notFound);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
