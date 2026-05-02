const { validateRegisterPayload } = require("./registerValidation");

describe("validateRegisterPayload", () => {
  it("returns no errors for valid payload", () => {
    expect(
      validateRegisterPayload({
        name: "Julio",
        email: "julio@example.com",
        password: "123456",
      })
    ).toEqual([]);
  });

  it("accumulates errors for multiple missing fields", () => {
    const errors = validateRegisterPayload({});
    expect(errors.map((e) => e.field).sort()).toEqual(["email", "name", "password"].sort());
  });

  it("rejects empty name", () => {
    const errors = validateRegisterPayload({
      name: "   ",
      email: "a@b.co",
      password: "123456",
    });
    expect(errors).toEqual([expect.objectContaining({ field: "name" })]);
  });

  it("rejects invalid email format", () => {
    const errors = validateRegisterPayload({
      name: "A",
      email: "not-an-email",
      password: "123456",
    });
    expect(errors).toEqual([expect.objectContaining({ field: "email" })]);
  });

  it("rejects short password", () => {
    const errors = validateRegisterPayload({
      name: "A",
      email: "a@b.co",
      password: "12345",
    });
    expect(errors).toEqual([expect.objectContaining({ field: "password" })]);
  });

  it("rejects non-string types", () => {
    const errors = validateRegisterPayload({
      name: 1,
      email: [],
      password: {},
    });
    expect(errors.map((e) => e.field).sort()).toEqual(["email", "name", "password"].sort());
  });
});
