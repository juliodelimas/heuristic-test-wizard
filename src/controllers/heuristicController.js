const heuristicService = require("../services/heuristicService");
const { validateHeuristicPayload } = require("../utils/heuristicValidation");

const create = async (req, res) => {
  try {
    const validationErrors = validateHeuristicPayload(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const { title, description } = req.body;
    const heuristic = await heuristicService.create({
      title,
      description,
      userId: req.userId,
    });
    return res.status(201).json(heuristic);
  } catch (error) {
    if (error.code === "HEURISTIC_TITLE_IN_USE") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unexpected error while creating heuristic" });
  }
};

module.exports = {
  create,
};
