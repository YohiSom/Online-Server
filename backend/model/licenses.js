import mongoose from "mongoose";
const { Schema } = mongoose;

const licenseSchema = new Schema(
  {
    status: { type: String, enum: ["Available", "Taken"], required: true },
    key: { type: String, required: true },
    expiration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const License = mongoose.model("License", licenseSchema);
export default License;
