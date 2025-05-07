import express from "express";
import cors from "cors";
import "./src/conn/conn.js";
import toDoListRouter from "./src/routes/toDoList.js";
import authRouter from "./src/routes/auth.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", toDoListRouter);
app.use("/api/v1", authRouter);

app.listen(1000, () => {
  console.log("running on port 1000");
});
