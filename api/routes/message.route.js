const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/message.controller.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);

module.exports = router;