const MessageModel = require('../models/messege.model');

const saveMessage = async (chatId, senderId, content) => {
    try {
        const message = new MessageModel({chatId: chatId, senderId: senderId, content: content});
        await message.save();
        return {
            EM: 'create message successfully',
            EC: 0,
            DT: ''
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'save message failed',
            EC: 1,
            DT: ''
        }
    }
}
const findMessageByChatId = async (chatId) => {
    try {
        let messages = await MessageModel.find({chatId: chatId});
        return {
            EM: 'find message successfully',
            EC: 0,
            DT: messages
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'find message failed',
            EC: 1,
            DT: ''
        }
    }
}
module.exports = {
    saveMessage,
    findMessageByChatId
}