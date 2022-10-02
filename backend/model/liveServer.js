import mongoose from "mongoose";
const { Schema } = mongoose;

const liveServerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  licenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "License",
    required: true,
  },
  serverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Server",
    required: true,
  },
  time: { type: Date, required: true },
});

const LiveServer = mongoose.model("LiveServer", liveServerSchema);
export default LiveServer;
