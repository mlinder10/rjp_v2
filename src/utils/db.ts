import mongoose from "mongoose";

const db_url = process.env.DATABASE || "none";
mongoose.connect(db_url, () => console.log("Connected to db"));

export default mongoose.connection;
