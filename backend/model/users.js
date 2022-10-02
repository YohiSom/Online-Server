import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    licenseHistory: [
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

const User = mongoose.model("User", UserSchema);
export default User;
