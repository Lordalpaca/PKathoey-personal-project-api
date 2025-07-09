import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./src/routes/auth.js";


const app = express();
const PORT = process.env.PORT || 8888;

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/auth", authRouter)

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
