const {createChat, userChats, getChat} = require('../services/chat.service')

const createChatController = async (req, res) => {
    const {senderId, receiverId} = req.body;
    if (!senderId || !receiverId) {
        return res.status(500).json({
            EM: 'server error creating chat ',
            EC: 1,
            DT: '',
        });
    }
    try {
        const data = await createChat(senderId, receiverId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        return res.status(500).json({
            EM: 'server error creating chat ',
            EC: 1,
            DT: '',
        });
    }
}
const userChatController = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(500).json({
            EM: 'server error userChatController ',
            EC: 1,
            DT: '',
        });
    }
    try {
        const data = await userChats(userId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        return res.status(500).json({
            EM: 'server error userChatController ',
            EC: 1,
            DT: '',
        });
    }
}
const findChat = async (req, res) => {
    const {senderId, receiverId} = req.params;
    // console.log(req.params);
    if (!senderId || !receiverId) {
        return res.status(500).json({
            EM: 'server error findChat ',
            EC: 1,
            DT: '',
        });
    }
    try {
        const data = await getChat(senderId, receiverId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'server error findChat ',
            EC: 1,
            DT: '',
        });
    }
}
module.exports = {
    createChatController,
    userChatController,
    findChat
}
