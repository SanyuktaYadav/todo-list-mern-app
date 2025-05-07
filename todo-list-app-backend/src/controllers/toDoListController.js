import ToDoList from "../models/toDoList.js";
import User from "../models/user.js";

export const AddTask = async (req, res) => {
  try {
    const { Task, Description, UserId } = req.body;
    if (!UserId) {
      res.status(400).json({
        Message: "Please Sign Up First",
        Status: "Failed",
      });
    }
    const existingUser = await User.findOne({ _id: UserId });
    if (existingUser) {
      const toDoList = new ToDoList({ Task, Description, UserId: UserId });
      await toDoList.save().then(() => {
        res.status(200).json({
          ToDoList: {
            Task: toDoList.Task,
            Description: toDoList.Description,
            Done: toDoList.Done,
          },
          Message: "ToDo added successfully",
          Status: "Success",
        });
      });
      existingUser.ToDoList.push(toDoList._id);
      existingUser.save();
    } else {
      res.status(400).json({
        Message: "Please Sign Up to save ToDos",
        Status: "Failed",
      });
    }
  } catch (err) {
    res.status(400).json({
      Message: "Something went wrong",
      Status: "Failed",
    });
    console.log("err = ", err);
  }
};

export const GetTask = async (req, res) => {
  try {
    const { UserId } = req.body;
    const currentUser = await User.findOne({ _id: UserId });
    if (currentUser) {
      const todos = await ToDoList.find({ _id: { $in: currentUser.ToDoList } });
      res.status(200).json({
        ToDoList: todos,
        Message: "ToDo List Fetched Successfully",
        Status: "Success",
      });
    }
  } catch (err) {
    res.status(400).json({
      Message: "Something went wrong",
      Status: "Failed",
    });
    console.log("err = ", err);
  }
};

export const DeleteTask = async (req, res) => {
  try {
    const { ToDoId, UserId } = req.body;
    if (!ToDoId) {
      res.status(400).json({
        Message: "Error in deleting the selected ToDo",
        Status: "Failed",
      });
    }

    if (ToDoId) {
      const deletedToDo = await ToDoList.findByIdAndDelete(ToDoId);
      if (!deletedToDo) {
        res.status(400).json({
          Message: "Error in deleting the selected ToDo",
          Status: "Failed",
        });
      }

      await User.findByIdAndUpdate(UserId, { $pull: { ToDoList: ToDoId } });
      res.status(200).json({
        Message: "ToDo deleted done successfully",
        Status: "Success",
      });
    }
  } catch (err) {
    res.status(400).json({
      Message: "Something went wrong",
      Status: "Failed",
    });
    console.log("err = ", err);
  }
};

export const UpdateTask = async (req, res) => {
  try {
    const { ToDoId, Task, Description } = req.body;
    if (!ToDoId) {
      res.status(400).json({
        Message: "Error in updating the selected ToDo",
        Status: "Failed",
      });
    }

    if (ToDoId) {
      const updatedToDo = await ToDoList.findByIdAndUpdate(
        ToDoId,
        {
          Task,
          Description,
        },
        { new: true }
      );
      if (!updatedToDo) {
        res.status(400).json({
          Message: "Error in updating the selected ToDo",
          Status: "Failed",
        });
      }

      res.status(200).json({
        Message: "ToDo Updated successfully",
        Status: "Success",
      });
    }
  } catch (err) {
    res.status(400).json({
      Message: "Something went wrong",
      Status: "Failed",
    });
    console.log("err = ", err);
  }
};

export const MarkCompleteTask = async (req, res) => {
  try {
    const { ToDoId } = req.body;
    if (!ToDoId) {
      res.status(400).json({
        Message: "Error in marking the selected ToDo",
        Status: "Failed",
      });
    }

    if (ToDoId) {
      const updatedToDo = await ToDoList.findByIdAndUpdate(
        ToDoId,
        {
          Done: true,
        },
        { new: true }
      );
      if (!updatedToDo) {
        res.status(400).json({
          Message: "Error in marking the selected ToDo",
          Status: "Failed",
        });
      }

      res.status(200).json({
        Message: "ToDo Updated successfully",
        Status: "Success",
      });
    }
  } catch (err) {
    res.status(400).json({
      Message: "Something went wrong",
      Status: "Failed",
    });
    console.log("err = ", err);
  }
};
