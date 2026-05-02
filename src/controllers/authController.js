const { register } = require("./registerHandler");
const authService = require("../services/authService");

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
