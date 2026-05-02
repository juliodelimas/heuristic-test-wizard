const express = require("express");
const healthRoutes = require("./healthRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const heuristicRoutes = require("./heuristicRoutes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/heuristics", heuristicRoutes);

module.exports = router;
