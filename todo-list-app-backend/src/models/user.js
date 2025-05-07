import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      unique: true,
      required: true,
    },
    UserName: {
      type: String,
    },
    Password: {
      type: String,
      required: true,
    },
    ToDoList: [{ type: mongoose.Types.ObjectId, ref: "ToDoList" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
