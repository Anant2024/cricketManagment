import { User } from "../models/user.js";

const register = async (req, res) => {
  console.log("Registering user");
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field === "")) {
    console.log("All fields are required");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      console.log("User with this email already exists");
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userName: newUser.userName,
      email: newUser.email
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register };
