const express = require('express');
const message_router = express.Router();
const {createMessage,getMessageByChatId} = require('../controllers/message.controller')

message_router.post('/',createMessage);
message_router.get('/:chatId',getMessageByChatId);

module.exports = message_router;