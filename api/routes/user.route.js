const express = require("express");
const { deleteUser, getUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
