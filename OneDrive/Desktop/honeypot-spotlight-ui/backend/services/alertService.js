import nodemailer from "nodemailer";

const sendAlert = async (log) => {
  if (log.severity !== "HIGH") return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ALERT_EMAIL,
      pass: process.env.ALERT_EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.ALERT_EMAIL,
    to: process.env.ALERT_EMAIL,
    subject: "Honeypot Alert - High Severity Attack",
    text: `
Protocol: ${log.protocol}
IP: ${log.source_ip}
Country: ${log.country}
Type: ${log.attack_type}
`
  });
};

export default sendAlert;
