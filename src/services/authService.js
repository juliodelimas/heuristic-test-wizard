const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");

const DUPLICATE_EMAIL_MESSAGE = "O e-mail informado já está em uso.";
const INVALID_CREDENTIALS_MESSAGE = "Credenciais inválidas.";
const USER_INACTIVE_MESSAGE = "O usuário não está ativo.";

const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw Object.assign(new Error(DUPLICATE_EMAIL_MESSAGE), {
        code: "EMAIL_IN_USE",
      });
    }
    throw error;
  }
};

const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw Object.assign(new Error(INVALID_CREDENTIALS_MESSAGE), {
      code: "INVALID_CREDENTIALS",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw Object.assign(new Error(INVALID_CREDENTIALS_MESSAGE), {
      code: "INVALID_CREDENTIALS",
    });
  }

  if (!user.active) {
    throw Object.assign(new Error(USER_INACTIVE_MESSAGE), {
      code: "USER_INACTIVE",
    });
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  register,
  login,
  DUPLICATE_EMAIL_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  USER_INACTIVE_MESSAGE,
};
