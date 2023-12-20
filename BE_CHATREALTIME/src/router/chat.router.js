const express = require('express');
const {createChatController,userChatController,findChat} = require('../controllers/chat.controller')
const chat_router = express.Router();
//
chat_router.post('/', createChatController);
chat_router.get('/:userId', userChatController);
chat_router.get('/:senderId/:receiverId', findChat);
module.exports = chat_router;