import crypto from "crypto";

export const hashIp = (ip) => {
  return crypto.createHash("sha256").update(ip).digest("hex");
};
