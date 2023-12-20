const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
    {
        members: {
            type: Array,
        }
    },
    {
        timeStamps: true
    });
const ChatModel = mongoose.model("Chat",ChatSchema);
module.exports = ChatModel;