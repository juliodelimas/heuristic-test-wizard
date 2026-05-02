const express = require("express");
const heuristicController = require("../controllers/heuristicController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, heuristicController.create);

module.exports = router;
