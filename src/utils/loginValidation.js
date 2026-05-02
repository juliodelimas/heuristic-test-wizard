const { EMAIL_REGEX } = require("./registerValidation");

function validateLoginPayload(body = {}) {
  const errors = [];
  const { email, password } = body;

  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "E-mail é obrigatório." });
  } else if (typeof email !== "string") {
    errors.push({ field: "email", message: "E-mail deve ser um texto." });
  } else {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      errors.push({ field: "email", message: "E-mail é obrigatório." });
    } else if (!EMAIL_REGEX.test(trimmed)) {
      errors.push({ field: "email", message: "E-mail inválido." });
    }
  }

  if (password === undefined || password === null) {
    errors.push({ field: "password", message: "Senha é obrigatória." });
  } else if (typeof password !== "string") {
    errors.push({ field: "password", message: "Senha deve ser um texto." });
  }

  return errors;
}

module.exports = {
  validateLoginPayload,
};
