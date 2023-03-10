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
  oid: String,
  phone: String,
  details: String,
  hasPaid: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
