import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  name: String,
  address: String,
  pavilion: String,
  time: String,
  residency: String,
  price: String,
  month: String,
  day: String,
});

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
