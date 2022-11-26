const chai = require("chai");
const expect = chai.expect;
chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("This is the Post Router Test Case", function () {
  describe("Create Post", function () {
    it("should followed successfull", async () => {
      const res = await chai.request("https://social-media-backend-czei.onrender.com").post("/api/posts").send({
        title: "first post",
        description: "This is a first post",
      });
      expect(res).to.have.status(200);
    });
  });

  describe("like a post", function () {
    it("should like the post for the given post id", async () => {
      const res = await chai.request("https://social-media-backend-czei.onrender.com").post("/like/6380cc381059da7af0155c3b");
      expect(res).to.have.status(200);
    });
  });

  describe("unlike a post", function () {
    it("should unlike the post for the given post id", async () => {
      const res = await chai.request("https://social-media-backend-czei.onrender.com").post("/unlike/6380cc381059da7af0155c3b");
      expect(res).to.have.status(200);
    });
  });
});
