const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const frodo = { name: "frodo" };
const sam = { name: "Sam" };
const bilbo = { name: "bilbo" };
const smeagol = { name: "smeagol" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

//another way to do it rather than seeding is to truncate the db to make sure it is empty and test based on an empty database
beforeEach(async () => {
  await db("hobbits").truncate();
  await db.seed.run(); //makes each test super predictable because the table always contains the same 4 hobbits at the beginning of each test
});

afterAll(async () => {
  //disconnects from the database
  await db.destroy();
});

describe("server", () => {
  describe("[GET] /hobbits", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server).get("/hobbits");
      //   expect(res).toEqual({}); <-- use in place of a console.log() to see what res looks like
      expect(res.status).toBe(200);
    });
    it("returns JSON", async () => {
      const res = await request(server).get("/hobbits");
      console.log("headers-->", res.header);
      expect(res.type).toBe("application/json");
    });
    it("returns the right number of hobbits", async () => {
      let res;
      res = await request(server).get("/hobbits");
      expect(res.body).toHaveLength(4);

      await db("hobbits").insert(bilbo);
      res = await request(server).get("/hobbits");
      expect(res.body).toHaveLength(5);
    });
    it("returns right format for hobbits", async () => {
      await db("hobbits").insert(bilbo);
      await db("hobbits").insert(smeagol);
      const res = await request(server).get("/hobbits");
      expect(res.body[4]).toMatchObject({ id: 5, ...bilbo });
      expect(res.body[5]).toMatchObject({ id: 6, ...smeagol });
    });
  });
  describe("[POST] /hobbits", () => {
    it("responds with 422 if no name in payload", async () => {
      const res = await request(server).post("/hobbits").send({ nam: "bIlBo" });
      expect(res.status).toBe(422);
    });
    it("returns 201 OK on successful POST", async () => {
      const res = await request(server).post("/hobbits").send(bilbo);
      expect(res.status).toBe(201);
    });
    it("responds with newly created hobbit", async () => {
      let res;
      res = await request(server).post("/hobbits").send(bilbo);
      expect(res.body).toMatchObject({ id: 5, ...bilbo });

      res = await request(server).post("/hobbits").send(smeagol);
      expect(res.body).toMatchObject({ id: 6, ...smeagol });
    }, 1000); //second argument is amount of milliseconds until a timeout, default is 5000ms
  });
});
