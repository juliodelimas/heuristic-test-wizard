const { validateLoginPayload } = require("./loginValidation");

describe("validateLoginPayload", () => {
  it("returns no errors for valid payload", () => {
    expect(
      validateLoginPayload({
        email: "julio@example.com",
        password: "any-secret",
      })
    ).toEqual([]);
  });

  it("accumulates missing email and password", () => {
    const errors = validateLoginPayload({});
    expect(errors.map((e) => e.field).sort()).toEqual(["email", "password"].sort());
  });

  it("rejects invalid email format", () => {
    const errors = validateLoginPayload({
      email: "not-an-email",
      password: "x",
    });
    expect(errors).toEqual([expect.objectContaining({ field: "email" })]);
  });

  it("rejects non-string credential fields", () => {
    const errors = validateLoginPayload({
      email: [],
      password: {},
    });
    expect(errors.map((e) => e.field).sort()).toEqual(["email", "password"].sort());
  });
});
