import mongoose from "mongoose";

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://sanyuktayadav77:Paymate_12345@todo-list-cluster.ewp7pca.mongodb.net/"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log("Mongodb Connection Error, ", error);
  }
};
conn();
