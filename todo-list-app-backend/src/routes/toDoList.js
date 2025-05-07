import express from "express";
import {
  AddTask,
  DeleteTask,
  GetTask,
  MarkCompleteTask,
  UpdateTask,
} from "../controllers/toDoListController.js";

const router = express.Router();

router.post("/AddTask", AddTask);

router.post("/GetTaskList", GetTask);

router.delete("/DeleteTask", DeleteTask);

router.patch("/UpdateTask", UpdateTask);

router.patch("/MarkCompleteTask", MarkCompleteTask);

export default router;
