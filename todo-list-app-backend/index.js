import express from "express";
import cors from "cors";
import "./src/conn/conn.js";
import toDoListRouter from "./src/routes/toDoList.js";
import authRouter from "./src/routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", toDoListRouter);
app.use("/api/v1", authRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
