function pushIfInvalidTitle(body, errors) {
  const { title } = body;
  if (title === undefined || title === null) {
    errors.push({ field: "title", message: "Título é obrigatório." });
    return;
  }
  if (typeof title !== "string") {
    errors.push({ field: "title", message: "Título deve ser um texto." });
    return;
  }
  if (!title.trim()) {
    errors.push({ field: "title", message: "Título é obrigatório." });
  }
}

function pushIfInvalidDescription(body, errors) {
  const { description } = body;
  if (description === undefined || description === null) {
    errors.push({ field: "description", message: "Descrição é obrigatória." });
    return;
  }
  if (typeof description !== "string") {
    errors.push({ field: "description", message: "Descrição deve ser um texto." });
    return;
  }
  if (!description.trim()) {
    errors.push({ field: "description", message: "Descrição é obrigatória." });
  }
}

function validateHeuristicPayload(body = {}) {
  const errors = [];
  pushIfInvalidTitle(body, errors);
  pushIfInvalidDescription(body, errors);
  return errors;
}

module.exports = {
  validateHeuristicPayload,
};
