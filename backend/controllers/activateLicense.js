import asyncHandler from "express-async-handler";
import User from "../model/users.js";
import Client from "../model/client.js";
import Server from "../model/server.js";
import License from "../model/licenses.js";
import LiveServer from "../model/liveServer.js";

function addMinutes(date, minutes) {
  var DateObject = new Date(String(date)),
    modifiedDate = DateObject.getTime() + minutes * 60000;
  return (date = modifiedDate);
}

const activateLicense = asyncHandler(async (req, res) => {
  const userId = req.body.id;
  const license = req.body.License_Key;
  const location = req.body.location;
  const time = req.body.time;
  //create client document

  const userDetails = await User.findById(userId);

  if (!userDetails) {
    res.status(404);
    throw new Error("Please login");
  }

  const client = await Client.create({
    name: userDetails.name,
    password: userDetails.password,
    license,
    location,
  });

  //add licenseId to server

  const serverId = req.body.Server_Id;
  const licenseId = req.body.License_id;

  const server = await Server.findById(serverId);
  server.runningLicenses.push(licenseId);
  await server.save();

  // add license ID to user licenseHistory
  userDetails.licenseHistory.push(licenseId.toString());
  await userDetails.save();

  //set license to status "Taken"
  const licenseDetails = await License.findById(licenseId);
  if (licenseDetails.status === "Taken") {
    res.status(404);
    throw new Error(
      "Oops! Not fast enough! This license is now being used by another user!"
    );
  }
  licenseDetails.status = "Taken";
  await licenseDetails.save();

  //create live server
  const liveServer = await LiveServer.create({
    userId: userId,
    licenceId: licenseId,
    serverId: serverId,
    time,
  });

  res.status(201);
  res.json({ licenseDetails, liveServer });

  //time expiration interval
  const dbTime = new Date(liveServer.time);
  const expiration = licenseDetails.expiration;
  const newtime = new Date(addMinutes(dbTime, expiration));

  //   console.log(newtime);

  let interval = setInterval(async () => {
    const timeNow = new Date();
    // console.log("now", timeNow);
    // console.log("future", newtime);
    if (timeNow > newtime) {
      // const licenseId = req.body.licenceId;
      // const liveServerId = req.body._id;
      // const serverId = req.body.serverId;
      //   console.log("true");
      const licenseDetails = await License.findById(licenseId);

      licenseDetails.status = "Available";
      await licenseDetails.save();

      const server = await Server.findById(serverId);

      const newLicenseArr = [];

      for (let i = 0; i < server.runningLicenses.length; i++) {
        if (server.runningLicenses[i].toString() !== licenseId) {
          newLicenseArr.push(server.runningLicenses[i]);
        }
      }

      server.runningLicenses = newLicenseArr;
      await server.save();

      //   const liveServer = await LiveServer.findById(liveServer._id);

      await LiveServer.deleteOne({ _id: liveServer._id });

      clearInterval(interval);
    }
  }, 1000);

  //delete liveServer after x time and remove from server array and change license status
});

export { activateLicense };
