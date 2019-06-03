var express = require("express");
var router = express.Router();
const Employee = require("./model");

/* GET home page. */
router.get("/employees", function(req, res, next) {
  return Employee.findAll();
});

module.exports = router;
