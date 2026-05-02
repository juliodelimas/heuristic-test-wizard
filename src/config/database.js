const mongoose = require("mongoose");
const env = require("./env");

let connectingPromise;

const ensureConnection = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (!connectingPromise) {
    connectingPromise = mongoose
      .connect(env.mongoUri)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
        connectingPromise = undefined;
        throw err;
      });
  }
  await connectingPromise;
};

const connectDatabase = async () => {
  try {
    await ensureConnection();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
module.exports.ensureConnection = ensureConnection;
