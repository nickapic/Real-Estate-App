const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", [], async (req, res) => {
  res.send("Hello from Profile Route");
});
module.exports = router;
