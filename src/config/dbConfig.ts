export const dbConfig = {
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: <const>"mysql",
  logging: false,
  retry: {
    match: [/Deadlock/i],
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    backoffJitter: 0,
  },
  pool: {
    max: 500,
    min: 30,
    acquire: 60000,
    idle: 10000
  },
  dialectOptions: { connectTimeout: 3000 }
};

// import crypto from "crypto";

// const algorithm = "aes-256-cbc";

// // 🔓 Decrypt function that matches your encryption logic
// function decrypt(encryptedText: string, secret: string) {
//   if (!encryptedText || !secret) {
//     throw new Error("Missing encrypted password or secret key");
//   }

//   // Convert secret to a 32-byte key (same as in encrypt script)
//   const key = crypto.createHash("sha256").update(secret).digest();

//   // Split iv and encrypted data
//   const [ivHex, encryptedHex] = encryptedText.split(":");
//   const iv = Buffer.from(ivHex, "hex");
//   const encryptedBuffer = Buffer.from(encryptedHex, "hex");

//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   let decrypted = decipher.update(encryptedBuffer);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

// export const dbConfig = {
//   username: process.env.DB_USER_NAME,
//   password: decrypt(
//     process.env.DB_PASSWORD || "",
//     process.env.DB_ENCRYPTION_KEY || ""
//   ),
//   database: process.env.DATABASE_NAME,
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   dialect: "mssql", // Change from "mysql" to "mssql"
//   logging: false,
//   dialectOptions: {
//     options: {
//       encrypt: false, // Use encryption if required
//       trustServerCertificate: true, // Set to false in production
//       requestTimeout: 30000, // Adjust as needed
//     },
//   },
//   pool: {
//     max: 500,
//     min: 30,
//     acquire: 60000,
//     idle: 10000,
//   },
// };
