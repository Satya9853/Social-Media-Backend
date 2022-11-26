const chai = require("chai");
const expect = chai.expect;
chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("This is the user Router Test Case", function () {
  describe("follow user", function () {
    it("should followed successfull", async () => {
      const res = await chai.request("https://social-media-backend-czei.onrender.com").post("/api/follow/63809df0e4ed322efe860ce0");
      expect(res).to.have.status(200);
    });
  });

  describe("unfollow user", function () {
    it("should unfollowed successfull", async () => {
      const res = await chai.request("https://social-media-backend-czei.onrender.com").post("/api/unfollow/63809df0e4ed322efe860ce0");
      expect(res).to.have.status(200);
    });
  });
});
