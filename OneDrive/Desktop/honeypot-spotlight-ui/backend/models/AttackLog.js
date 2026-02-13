import mongoose from "mongoose";

const AttackLogSchema = new mongoose.Schema({
  source_ip: { type: String, required: true },
  country: String,
  city: String,
  attackType: String,
  severity: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("AttackLog", AttackLogSchema);
