import Server from "../model/server.js";
import asyncHandler from "express-async-handler";
import License from "../model/licenses.js";

const addServerToDb = asyncHandler(async (req, res) => {
  const { IP, capacity, location, runningLicenses } = req.body;

  const serverExists = await Server.findOne({ IP });

  if (serverExists) {
    res.status(400);
    throw new Error("server already exists!");
  }

  const server = await Server.create({
    IP,
    capacity,
    location,
    runningLicenses,
  });

  if (server) {
    res.status(201);
    res.json(server);
  } else {
    res.status(400);
    throw new Error("Something went wrong with creating server");
  }
});

const addLicensesToDb = asyncHandler(async (req, res) => {
  const { status, key, expiration } = req.body;

  const licenseExists = await License.findOne({ key });

  if (licenseExists) {
    res.status(400);
    throw new Error("license already exists!");
  }

  const license = await License.create({
    status,
    key,
    expiration,
  });

  if (license) {
    res.status(201);
    res.json(license);
  } else {
    res.status(400);
    throw new Error("Something went wrong with creating license");
  }
});

export { addServerToDb, addLicensesToDb };
