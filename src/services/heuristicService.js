const Heuristic = require("../models/Heuristic");

const DUPLICATE_TITLE_MESSAGE =
  "Já existe uma heurística cadastrada com este título para sua conta.";

function toPublicHeuristic(doc) {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    createdBy: String(doc.createdBy),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

const create = async ({ title, description, userId }) => {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  try {
    const heuristic = await Heuristic.create({
      title: trimmedTitle,
      description: trimmedDescription,
      createdBy: userId,
    });
    return toPublicHeuristic(heuristic);
  } catch (error) {
    if (error.code === 11000) {
      throw Object.assign(new Error(DUPLICATE_TITLE_MESSAGE), {
        code: "HEURISTIC_TITLE_IN_USE",
      });
    }
    throw error;
  }
};

module.exports = {
  create,
  DUPLICATE_TITLE_MESSAGE,
};
