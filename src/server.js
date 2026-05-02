const app = require("./app");
const connectDatabase = require("./config/database");
const env = require("./config/env");

const startLocalServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running at ${env.baseUrl}`);
    console.log(`Swagger docs available at ${env.baseUrl}/docs`);
  });
};

if (!process.env.VERCEL) {
  startLocalServer().catch((err) => {
    console.error("Failed to start server:", err?.message ?? err);
    process.exit(1);
  });
}

module.exports = app;
