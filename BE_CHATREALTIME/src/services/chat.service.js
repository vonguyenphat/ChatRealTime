const ChatModel = require("../models/chat.model");

const createChat = async (senderId, receiverId) => {
    const newChat = new ChatModel({
        members: [senderId, receiverId]
    })
    try {
        const result = await newChat.save();
        return {
            EM: 'create chat successfully',
            EC: 0,
            DT: result
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'create chat failed',
            EC: 1,
            DT: ''
        }
    }
}
const userChats = async (userId) => {
    try {
        const result = await ChatModel.find({
            members: { $in: [userId] },
        });
      return{
          EM: 'get user chat successfully',
          EC: 0,
          DT: result
      }
    } catch (error) {
        console.log(error);
        return {
            EM: 'get user chat failed',
            EC: 1,
            DT: ''
        }
    }
};
const getChat = async (senderId, receiverId) =>{
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[senderId, receiverId]}
        })
        return {
            EM: 'get  chat successfully',
            EC: 0,
            DT: chat
        }
    }catch (e) {
        console.log(e);
        return {
            EM: 'get chat failed',
            EC: 1,
            DT: ''
        }
    }
}
module.exports = {
    createChat,
    userChats,
    getChat
}