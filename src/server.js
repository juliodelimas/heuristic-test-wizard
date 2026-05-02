const app = require("./app");
const connectDatabase = require("./config/database");
const env = require("./config/env");

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running at ${env.baseUrl}`);
    console.log(`Swagger docs available at ${env.baseUrl}/docs`);
  });
};

startServer();
