jest.mock("../models/User");
jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
  compare: jest.fn(),
}));
jest.mock("../config/env", () => ({
  jwtSecret: "test",
  jwtExpiresIn: "1h",
}));

const bcrypt = require("bcryptjs");
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
