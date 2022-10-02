import asyncHandler from "express-async-handler";

const loginAuth = asyncHandler(async (req, res, next) => {
  const { name, location, userId } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Please login!");
  }

  try {
    req.location = location;
    req.user = userId;

    console.log(req.location);
    console.log(req.user);

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Please login!");
  }
});

export { loginAuth };
