const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const ensureMongoConnected = require("./middleware/ensureMongoConnected");

const app = express();
const openApiDocument = YAML.load(path.resolve(__dirname, "docs", "openapi.yaml"));

app.use(cors());
app.use(express.json());
app.use(ensureMongoConnected);

app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(errorHandler);

module.exports = app;
