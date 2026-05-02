jest.mock("../models/User");
jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
  compare: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("jwt-token"),
}));
jest.mock("../config/env", () => ({
  jwtSecret: "test",
  jwtExpiresIn: "1h",
}));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authService = require("./authService");

describe("authService.register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hashes password, persists trimmed fields, returns public payload with active", async () => {
    User.create.mockResolvedValue({
      id: "507f191e810c19729de860ea",
      name: "Ada",
      email: "ada@example.com",
      active: true,
    });

    const result = await authService.register({
      name: "  Ada ",
      email: "  Ada@Example.com  ",
      password: "secret12",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("secret12", 10);
    expect(User.create).toHaveBeenCalledWith({
      name: "Ada",
      email: "ada@example.com",
      password: "hashed-password",
    });
    expect(result).toEqual({
      id: "507f191e810c19729de860ea",
      name: "Ada",
      email: "ada@example.com",
      active: true,
    });
    expect(result.password).toBeUndefined();
  });

  it("throws EMAIL_IN_USE with stable message when duplicate key occurs", async () => {
    const dup = new Error("duplicate");
    dup.code = 11000;
    User.create.mockRejectedValue(dup);

    await expect(
      authService.register({ name: "A", email: "a@b.co", password: "123456" })
    ).rejects.toMatchObject({
      code: "EMAIL_IN_USE",
      message: authService.DUPLICATE_EMAIL_MESSAGE,
    });
  });
});

describe("authService.login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("looks up normalized email, returns JWT and public user when active and password matches", async () => {
    User.findOne.mockResolvedValue({
      id: "u1",
      name: "Ada",
      email: "ada@example.com",
      password: "stored-hash",
      active: true,
    });
    bcrypt.compare.mockResolvedValue(true);

    const result = await authService.login({
      email: "  Ada@Example.COM  ",
      password: "secret12",
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: "ada@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith("secret12", "stored-hash");
    expect(jwt.sign).toHaveBeenCalledWith(
      { sub: "u1", email: "ada@example.com" },
      "test",
      { expiresIn: "1h" }
    );
    expect(result).toEqual({
      token: "jwt-token",
      user: { id: "u1", name: "Ada", email: "ada@example.com" },
    });
  });

  it("throws INVALID_CREDENTIALS when user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    await expect(
      authService.login({ email: "missing@example.com", password: "secret12" })
    ).rejects.toMatchObject({
      code: "INVALID_CREDENTIALS",
      message: authService.INVALID_CREDENTIALS_MESSAGE,
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("throws INVALID_CREDENTIALS when password does not match", async () => {
    User.findOne.mockResolvedValue({
      id: "u1",
      email: "a@b.co",
      password: "hash",
      active: true,
    });
    bcrypt.compare.mockResolvedValue(false);

    await expect(
      authService.login({ email: "a@b.co", password: "wrong" })
    ).rejects.toMatchObject({
      code: "INVALID_CREDENTIALS",
      message: authService.INVALID_CREDENTIALS_MESSAGE,
    });
  });

  it("throws USER_INACTIVE after valid password when user is inactive", async () => {
    User.findOne.mockResolvedValue({
      id: "u1",
      email: "a@b.co",
      password: "hash",
      active: false,
    });
    bcrypt.compare.mockResolvedValue(true);

    await expect(
      authService.login({ email: "a@b.co", password: "correct" })
    ).rejects.toMatchObject({
      code: "USER_INACTIVE",
      message: authService.USER_INACTIVE_MESSAGE,
    });
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
