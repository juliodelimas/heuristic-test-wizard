const { register } = require("./registerHandler");
const authService = require("../services/authService");
const { validateLoginPayload } = require("../utils/loginValidation");

const login = async (req, res) => {
  try {
    const validationErrors = validateLoginPayload(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    return res.status(200).json(data);
  } catch (error) {
    if (error.code === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: error.message });
    }

    if (error.code === "USER_INACTIVE") {
      return res.status(403).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unexpected error while authenticating user" });
  }
};

module.exports = {
  register,
  login,
};
