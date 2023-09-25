const express = require("express");
const {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} = require("../controllers/conversation.controller.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, createConversation);

// get the conversation of a user with another user
router.get("/single/:id", verifyToken, getSingleConversation);

// get all conversations of a user with other users
router.get("/", verifyToken, getConversations);

router.put("/:id", verifyToken, updateConversation);

module.exports = router;
