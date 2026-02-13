import AttackLog from "../models/AttackLog.js";

const PROTOCOL_COLORS = {
  SSH: "hsl(190, 95%, 50%)",
  HTTP: "hsl(280, 90%, 60%)",
  FTP: "hsl(142, 76%, 45%)",
  SMB: "hsl(38, 92%, 50%)",
  RDP: "hsl(0, 84%, 60%)",
  DB: "hsl(220, 90%, 60%)",
};

export const getLogs = async (req, res) => {
  try {
    const logs = await AttackLog.find().sort({ timestamp: -1 }).limit(500).lean();
    const formatted = logs.map((log, i) => ({
      id: String(log._id),
      ip: log.source_ip,
      protocol: log.attackType || "SSH",
      timestamp: log.timestamp ? new Date(log.timestamp).toISOString().slice(0, 19).replace("T", " ") : "",
      severity: log.severity || "medium",
      eventType: log.attackType || "Unknown",
      country: log.country || "Unknown",
      port: 22,
    }));
    res.json(formatted);
  } catch (err) {
    console.error("GET LOGS ERROR:", err);
    res.status(200).json([]);
  }
};

export const addLog = async (req, res) => {
  try {
    console.log("RAW BODY:", req.body);

    const log = await AttackLog.create({
      source_ip: req.body.source_ip,
      country: req.body.country,
      city: req.body.city,
      attackType: req.body.attackType,
      severity: req.body.severity
    });

    res.status(201).json(log);
  } catch (err) {
    console.error("ADD LOG ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
