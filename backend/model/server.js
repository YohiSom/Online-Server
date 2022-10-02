import mongoose from "mongoose";
const { Schema } = mongoose;

const serverSchema = new Schema(
  {
    IP: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    runningLicenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "License",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Server = mongoose.model("Server", serverSchema);
export default Server;
