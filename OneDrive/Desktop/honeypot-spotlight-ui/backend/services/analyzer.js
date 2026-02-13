const analyzeAttack = (data) => {
  let attack_type = "Unknown";
  let severity = "LOW";

  if (data.protocol === "SSH" && data.password) {
    attack_type = "Brute Force Attack";
    severity = "HIGH";
  }

  if (data.protocol === "HTTP") {
    attack_type = "Web Reconnaissance";
    severity = "MEDIUM";
  }

  if (data.protocol === "FTP") {
    attack_type = "Credential Harvesting";
    severity = "HIGH";
  }

  return { attack_type, severity };
};

export default analyzeAttack;
