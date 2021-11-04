const Hobbits = require("./hobbits-model");
const db = require("../../data/dbConfig");

const bilbo = { name: "bilbo" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

test("is the correct env for tests", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Hobbits model db access functions", () => {
  describe("Hobbits.getAll", () => {
    it("resolves all hobbits in the hobbits table", async () => {
      const hobbits = await Hobbits.getAll();
      expect(hobbits).toHaveLength(4);
    });
    it("resolves to the correct hobbit shapes", async () => {
      const hobbits = await Hobbits.getAll();
      expect(hobbits[0]).toHaveProperty("id", 1);
      expect(hobbits[0]).toHaveProperty("name", "sam");

      expect(hobbits[1]).toMatchObject({ id: 2, name: "frodo" });
      expect(hobbits[2]).toMatchObject({ id: 3, name: "pippin" });
    });
  });

  describe("Hobbits.insert", () => {
    it("adds hobbits to the db", async () => {
      let all;
      await Hobbits.insert(bilbo);
      all = await db("hobbits");
      expect(all).toHaveLength(5);
    });

    it("resolves to the newly inserted hobbit", async () => {
      const hobbit = await Hobbits.insert(bilbo);
      expect(hobbit).toMatchObject({ id: 5, ...bilbo });
    });
  });
  describe("update function", () => {
    it("updates the hobbit", async () => {
      const [id] = await db("hobbits").insert(bilbo);
      await Hobbits.update(id, { name: "Bilbo" });
      const updated = await db("hobbits").where({ id }).first();
      expect(updated.name).toBe("Bilbo");
    });
  });
});
