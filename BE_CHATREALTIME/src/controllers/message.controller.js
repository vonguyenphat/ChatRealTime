const {saveMessage, findMessageByChatId} = require('../services/messege.service');

const createMessage = async (req, res) => {
    const {chatId, senderId, content} = req.body;
    console.log(req.body);
    if (!chatId || !senderId) {
        return res.status(500).json({
            EM: 'server error creating message',
            EC: 1,
            DT: '',
        });
    }
    try {
        let data = await saveMessage(chatId, senderId, content);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'server error creating message',
            EC: 1,
            DT: '',
        });
    }
}

const getMessageByChatId = async (req, res) => {
    let chatId = req.params.chatId;
    if (!chatId) {
        return res.status(500).json({
            EM: 'server error get message by chatId',
            EC: 1,
            DT: '',
        });
    }
    try {
        let data = await findMessageByChatId(chatId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'server error get message by chatId',
            EC: 1,
            DT: '',
        });
    }
}
module.exports = {
    createMessage,
    getMessageByChatId
}