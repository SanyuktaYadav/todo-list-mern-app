import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const RegisterUser = async (req, res) => {
  try {
    const { Email, UserName, Password } = req.body;

    if (!Email) {
      res.status(400).json({
        Message: "Email is Required",
        Status: "Failed",
      });
    }
    if (!Password) {
      res.status(400).json({
        Message: "Password is Required",
        Status: "Failed",
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = new User({ Email, UserName, Password: hashedPassword });

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      res.status(400).json({
        Message: "User already exists",
        Status: "Failed",
      });
    }

    await user.save().then(() => {
      res.status(200).json({
        User: { Email: user.Email, UserName: user.UserName },
        Message: "User Registered Successfully",
        Status: "Success",
      });
    });
  } catch (err) {
    res.status(400).json({
      Message: "Someting went wrong",
      Status: "Failed",
    });
    console.log(err);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email) {
      res.status(400).json({
        Message: "Email is Required",
        Status: "Failed",
      });
    }
    if (!Password) {
      res.status(400).json({
        Message: "Password is Required",
        Status: "Failed",
      });
    }

    const existingUser = await User.findOne({ Email });
    if (!existingUser) {
      res.status(400).json({
        Message: "Please Sign Up first",
        Status: "Failed",
      });
    }

    if (existingUser) {
      const isPasswordValid = bcrypt.compareSync(
        Password,
        existingUser.Password
      );
      if (existingUser.Email === Email && isPasswordValid) {
        res.status(200).json({
          User: {
            Email: existingUser.Email,
            UserName: existingUser.UserName,
            _id: existingUser._id,
          },
          Message: "User Signed In Successfully",
          Status: "Success",
        });
      } else {
        res.status(400).json({
          User: { Email: existingUser.Email, UserName: existingUser.UserName },
          Message: "Incorrect Email or Password",
          Status: "Failed",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      Message: "Someting went wrong",
      Status: "Failed",
    });
    console.log(err);
  }
};
