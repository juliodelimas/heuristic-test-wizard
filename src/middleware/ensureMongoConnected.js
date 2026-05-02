const { ensureConnection } = require("../config/database");

/** GET /docs and Swagger assets; health must stay fast without DB. */
function skipsMongoForRequest(req) {
  if (req.method !== "GET") return false;
  const pathname = req.originalUrl.split("?")[0];
  if (pathname.startsWith("/docs")) return true;
  return /^\/api\/health\/?$/.test(pathname);
}

const ensureMongoConnected = async (req, res, next) => {
  if (skipsMongoForRequest(req)) {
    return next();
  }

  try {
    await ensureConnection();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ensureMongoConnected;
