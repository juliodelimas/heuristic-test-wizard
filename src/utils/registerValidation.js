const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pushIfInvalidName(body, errors) {
  const { name } = body;
  if (name === undefined || name === null) {
    errors.push({ field: "name", message: "Nome é obrigatório." });
    return;
  }
  if (typeof name !== "string") {
    errors.push({ field: "name", message: "Nome deve ser um texto." });
    return;
  }
  if (!name.trim()) {
    errors.push({ field: "name", message: "Nome é obrigatório." });
  }
}

function pushIfInvalidEmail(body, errors) {
  const { email } = body;
  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "E-mail é obrigatório." });
    return;
  }
  if (typeof email !== "string") {
    errors.push({ field: "email", message: "E-mail deve ser um texto." });
    return;
  }
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    errors.push({ field: "email", message: "E-mail é obrigatório." });
    return;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    errors.push({ field: "email", message: "E-mail inválido." });
  }
}

function pushIfInvalidPassword(body, errors) {
  const { password } = body;
  if (password === undefined || password === null) {
    errors.push({ field: "password", message: "Senha é obrigatória." });
    return;
  }
  if (typeof password !== "string") {
    errors.push({ field: "password", message: "Senha deve ser um texto." });
    return;
  }
  if (password.length < 6) {
    errors.push({ field: "password", message: "Senha deve ter no mínimo 6 caracteres." });
  }
}

function validateRegisterPayload(body = {}) {
  const errors = [];
  pushIfInvalidName(body, errors);
  pushIfInvalidEmail(body, errors);
  pushIfInvalidPassword(body, errors);
  return errors;
}

module.exports = {
  EMAIL_REGEX,
  validateRegisterPayload,
};
