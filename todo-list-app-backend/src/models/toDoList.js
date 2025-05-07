import mongoose from "mongoose";

const toDoListSchema = new mongoose.Schema(
  {
    Task: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Done: {
      type: Boolean,
      default: false,
    },
    UserId: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ToDoList", toDoListSchema);
