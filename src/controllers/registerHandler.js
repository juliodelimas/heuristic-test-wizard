const authService = require("../services/authService");
const { validateRegisterPayload } = require("../utils/registerValidation");

const register = async (req, res) => {
  try {
    const validationErrors = validateRegisterPayload(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    if (error.code === "EMAIL_IN_USE") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unexpected error while registering user" });
  }
};

module.exports = {
  register,
};
