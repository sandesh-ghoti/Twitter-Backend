const express = require("express");
const router = express.Router();
const v1Route = require("./v1");
router.use("/v1", v1Route);
router.get("/", (req, res) => {
  return res.send("ok");
});
module.exports = router;
