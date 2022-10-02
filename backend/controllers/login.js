import User from "../model/users.js";
import asyncHandler from "express-async-handler";

const register = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const userExists = await User.findOne({ name: name });

  if (userExists) {
    res.status(400);
    throw new Error("This username already exists. Please try another name");
  }

  if (!name || !password) {
    res.status(404);
    throw new Error("Please provide all values!");
  }

  const user = await User.create({ name, password });

  if (user) {
    res.status(201);
    res.json({
      id: user._id,
      name: user.name,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && user.password === password) {
    res.json({
      id: user._id,
      name: user.name,
    });
  } else {
    res.status(401);

    throw new Error("Invalid name or password!");
  }
});

export { register, login };
