import AttackLog from "../models/AttackLog.js";

const PROTOCOL_COLORS = {
  SSH: "hsl(190, 95%, 50%)",
  HTTP: "hsl(280, 90%, 60%)",
  FTP: "hsl(142, 76%, 45%)",
  SMB: "hsl(38, 92%, 50%)",
  RDP: "hsl(0, 84%, 60%)",
  DB: "hsl(220, 90%, 60%)",
};

const emptyStats = {
  summaryStats: { totalAttacks: 0, activeThreats: 0, monitoredProtocols: 6, alertsTriggered: 0 },
  protocolStats: [],
  recentAttacks: [],
  geoData: [],
  timelineData: [],
};

export const getStats = async (req, res) => {
  try {
    const total = await AttackLog.countDocuments();

    const byProtocol = await AttackLog.aggregate([
      { $group: { _id: "$attackType", count: { $sum: 1 } } }
    ]);

    const recentLogs = await AttackLog.find().sort({ timestamp: -1 }).limit(20).lean();

    const protocolStats = byProtocol.map((p) => {
      const protocol = p._id || "SSH";
      const attacks = p.count;
      const percentage = total > 0 ? Math.round((attacks / total) * 100) : 0;
      return {
        protocol,
        attacks,
        percentage,
        color: PROTOCOL_COLORS[protocol] || "hsl(190, 95%, 50%)",
      };
    });

    const byCountry = await AttackLog.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const recentAttacks = recentLogs.map((log) => ({
      id: String(log._id),
      ip: log.source_ip,
      protocol: log.attackType || "SSH",
      timestamp: log.timestamp ? new Date(log.timestamp).toISOString().slice(0, 19).replace("T", " ") : "",
      severity: log.severity || "medium",
      eventType: log.attackType || "Unknown",
      country: log.country || "Unknown",
      port: 22,
    }));

    const geoData = byCountry.map((c) => ({
      country: c._id || "Unknown",
      attacks: c.count,
      lat: 0,
      lng: 0,
    }));

    res.json({
      summaryStats: {
        totalAttacks: total,
        activeThreats: recentLogs.filter((l) => (l.severity || "").match(/critical|high/)).length,
        monitoredProtocols: 6,
        alertsTriggered: total,
      },
      protocolStats,
      recentAttacks,
      geoData,
      timelineData: [],
    });
  } catch (err) {
    console.error("GET STATS ERROR:", err);
    res.status(200).json(emptyStats);
  }
};
