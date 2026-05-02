const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    if (error.message === "E-mail already in use") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unexpected error while registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    return res.status(200).json(data);
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "Unexpected error while authenticating user" });
  }
};

module.exports = {
  register,
  login,
};
