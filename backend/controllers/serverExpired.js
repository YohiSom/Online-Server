import asyncHandler from "express-async-handler";
import Server from "../model/server.js";
import License from "../model/licenses.js";
import LiveServer from "../model/liveServer.js";

const removeLiveServer = asyncHandler(async (req, res) => {
  //set license back to available V
  //remove id from server array V
  //delete doc of liveserver V

  const licenseId = req.body.licenceId;
  const liveServerId = req.body._id;
  const serverId = req.body.serverId;

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

  const liveServer = await LiveServer.findById(liveServerId);
  await LiveServer.deleteOne({ _id: liveServer._id });

  res.status(201);
  res.json("ok");
});

export { removeLiveServer };
