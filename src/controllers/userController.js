const User = require("../models/User");
const { register } = require("./registerHandler");

const getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

module.exports = {
  register,
  getProfile,
};
