const express = require("express");
const validator = require("express-validator");

const router = express.Router();

router.get("/", [], async (req, res) => {
  res.send("Hello from Sell Properties");
});
module.exports = router;
