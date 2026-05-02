jest.mock("../models/Heuristic");

const Heuristic = require("../models/Heuristic");
const heuristicService = require("./heuristicService");

describe("heuristicService.create", () => {
  const fixedNow = new Date("2026-05-02T12:00:00.000Z");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("trims fields, persists with userId as createdBy, returns public payload with ISO timestamps", async () => {
    Heuristic.create.mockResolvedValue({
      id: "507f191e810c19729de860ea",
      title: "Status visibility",
      description: "Explain what is happening.",
      createdBy: "507f1f77bcf86cd799439011",
      createdAt: fixedNow,
      updatedAt: fixedNow,
    });

    const result = await heuristicService.create({
      title: "  Status visibility  ",
      description: "  Explain what is happening.  ",
      userId: "507f1f77bcf86cd799439011",
    });

    expect(Heuristic.create).toHaveBeenCalledWith({
      title: "Status visibility",
      description: "Explain what is happening.",
      createdBy: "507f1f77bcf86cd799439011",
    });
    expect(result).toEqual({
      id: "507f191e810c19729de860ea",
      title: "Status visibility",
      description: "Explain what is happening.",
      createdBy: "507f1f77bcf86cd799439011",
      createdAt: "2026-05-02T12:00:00.000Z",
      updatedAt: "2026-05-02T12:00:00.000Z",
    });
  });

  it("throws HEURISTIC_TITLE_IN_USE when duplicate compound key occurs", async () => {
    const dup = new Error("duplicate");
    dup.code = 11000;
    Heuristic.create.mockRejectedValue(dup);

    await expect(
      heuristicService.create({
        title: "Same",
        description: "A",
        userId: "507f1f77bcf86cd799439011",
      })
    ).rejects.toMatchObject({
      code: "HEURISTIC_TITLE_IN_USE",
      message: heuristicService.DUPLICATE_TITLE_MESSAGE,
    });
  });
});
