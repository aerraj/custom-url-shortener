//jshint esversion:6

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
   return res.render("home");
});



module.exports = router;