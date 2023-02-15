import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  value: Number,
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
