const { validateHeuristicPayload } = require("./heuristicValidation");

describe("validateHeuristicPayload", () => {
  it("returns no errors for valid payload", () => {
    expect(
      validateHeuristicPayload({
        title: "Visibility",
        description: "Keep users informed about system status.",
      })
    ).toEqual([]);
  });

  it("accumulates errors for missing title and description", () => {
    const errors = validateHeuristicPayload({});
    expect(errors.map((e) => e.field).sort()).toEqual(["description", "title"].sort());
  });

  it("rejects whitespace-only title", () => {
    const errors = validateHeuristicPayload({
      title: "   ",
      description: "Ok",
    });
    expect(errors).toEqual([expect.objectContaining({ field: "title" })]);
  });

  it("rejects whitespace-only description", () => {
    const errors = validateHeuristicPayload({
      title: "Ok",
      description: "\t\n",
    });
    expect(errors).toEqual([expect.objectContaining({ field: "description" })]);
  });

  it("rejects non-string types", () => {
    const errors = validateHeuristicPayload({
      title: 1,
      description: [],
    });
    expect(errors.map((e) => e.field).sort()).toEqual(["description", "title"].sort());
  });
});
