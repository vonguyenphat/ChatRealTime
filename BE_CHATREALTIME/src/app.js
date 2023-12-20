require('dotenv').config();
const express = require('express');
const app = express();
const configCors = require('./config/config.cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const appRouter = require('./router/app.router');


const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;
const PORT = process.env.PORT;

const cors = require("cors");


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
configCors(app);
appRouter(app);


mongoose
    .connect(MONGODB_CONNECTION_URI)
    .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

const io = require('socket.io')({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

let activeUsers = [];
io.on('connection', (socket) => {
    // create socket client
    // events sent message
    socket.on("sendMessage", (data) => {
        // console.log(data);
        let sender = activeUsers.find(user => data.senderId === user.userId);
        let checkUser = activeUsers.find(user => data.receiverId === user.userId);
        io.emit("receiveMessage",{data, checkUser})
        if (checkUser) {
            // io.to(checkUser.socketId).to(sender.socketId).emit("receiveMessage", {data, checkUser});
        } else {
            // io.to(sender.socketId).emit("receiveMessage", {data, checkUser});
        }
    });
    // chia socket thanh tung room
    // get user dang online sau do lay du lieu so sanh de gui ve dung user nhan tin nhan
    socket.on("currentUserOnline", (data) => {
        if (!activeUsers.some(user => user.userId === data.userId)) {
            activeUsers.push({userId: data.userId, socketId: socket.id});
        } else {
            activeUsers.forEach((value, index) => {
                if (value.userId === data.userId) {
                    activeUsers[index].userId = data.userId;
                    activeUsers[index].socketId = socket.id;
                }
            })
        }
        io.emit("getUsersOnline", activeUsers);
    });
    socket.on("userDisconnected", (data) => {
        activeUsers = activeUsers.filter(item => item.userId === data.userId);
        io.emit("getUsersOnline", activeUsers);
    });
});
console.log(activeUsers);
io.listen(8800);
