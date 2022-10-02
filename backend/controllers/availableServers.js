import Server from "../model/server.js";
import License from "../model/licenses.js";
import asyncHandler from "express-async-handler";
import User from "../model/users.js";

const checkForServer = asyncHandler(async (req, res) => {
  const location = req.body.location;
  const userId = req.body.id;

  const server = await Server.find({ location });
  let availableArr = [];
  let allowedKeysArr = [];
  let isDouble = false;

  if (server.length === 0) {
    res.status(400);
    throw new Error("No available server in your country!");
  }

  for (let i = 0; i < server.length; i++) {
    if (server[i].capacity > server[i].runningLicenses.length) {
      availableArr.push(server[i]);
    }
  }

  if (availableArr.length === 0) {
    res.status(400);
    throw new Error(
      "No available server at this moment, please try again in a few moments"
    );
  }

  const licenses = await License.find({ status: "Available" });

  const user = await User.findById(userId);
  const userLicenses = user.licenseHistory;

  if (!user) {
    res.status(400);
    throw new Error("No user found!");
  }

  if (user.licenseHistory !== null && user.licenseHistory.length > 0) {
    const userLicenses = user.licenseHistory;

    for (let i = 0; i < licenses.length; i++) {
      isDouble = false;
      for (let j = 0; j < userLicenses.length; j++) {
        if (licenses[i]._id.toString() === userLicenses[j].toString()) {
          isDouble = true;
        }
      }
      if (isDouble === false) {
        allowedKeysArr.push(licenses[i]);
      }
    }

    if (availableArr.length > 0) {
      res.status(201);
      res.json({
        location: availableArr[0].location,
        capacity: availableArr[0].capacity,
        serverId: availableArr[0]._id,
        licenses: allowedKeysArr,
      });
    }
  }
  if (user.licenseHistory.length === 0 && availableArr.length > 0) {
    res.status(201);
    res.json({
      location: availableArr[0].location,
      capacity: availableArr[0].capacity,
      serverId: availableArr[0]._id,
      licenses,
    });
  }

  if (user.licenseHistory.length === 10) {
    res.status(400);
    throw new Error(
      "You have used up all the licenses. You cannot use the server!"
    );
  }
});

export { checkForServer };
