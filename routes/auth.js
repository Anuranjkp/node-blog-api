const express = require("express");
const router = express.Router();
var userModel = require("../models/userModels");
var bcrypt = require("bcrypt");

const authController = require("../controller/authController");

router.post("/sign-up", authController.signUp)
router.post('/sign-in', authController.signIn)

module.exports = router;
