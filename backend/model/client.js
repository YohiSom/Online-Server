import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  license: { type: String, required: true },
  location: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
