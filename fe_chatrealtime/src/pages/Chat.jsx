import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Conversation from '../components/Conversation'
import ChatBox from '../components/ChatBox'
import {getChatByUserId} from '../services/ChatService'
import {createMessage} from "../services/MessageService";
import {socket} from '../services/Socket';

const Chat = () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toISOString().replace(/\.\d+/, '+00:00');
    const trimmedTimeString = formattedTime.slice(0, -1);
    const {account} = useSelector((state) => state.auth);
    const {id, name} = account.data.DT;
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [content, setContent] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    let receivedId;
    const [userOnlines, setUserOnlines] = useState([]);
    // get all friend chat user
    useEffect(() => {
        const fetchChatByUserId = async () => {
            try {
                return await getChatByUserId(id);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
        fetchChatByUserId().then((data) => {
            if (data && data.EC === 0) {
                setChats(data.DT);
                setCurrentChat(data.DT[0])
            }
        });
    }, [id]);
    const handlerSelectChat = (data) => {
        setCurrentChat(data);
    }
    const handleInputOnChange = (event) => {
        setContent(event.target.value);
    }

    const fetchCreateMessage = async () => {
        if (!content || content === '') {
            return;
        }
        receivedId = currentChat.members.find((receivedId) => receivedId !== id);
        let data = {
            chatId: currentChat._id,
            senderId: id,
            content: content
        }
        let dataSendMessage = {
            senderId: id,
            receiverId: receivedId,
            chatId: currentChat._id,
            content: content,
            createdAt: trimmedTimeString,
            updatedAt: trimmedTimeString
        }
        socket.emit("sendMessage", dataSendMessage);
        return await createMessage(data);
    }
    // handle receive message
    const handleSendMessage = () => {

        fetchCreateMessage()
            .then(() => {
                setContent("");
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            console.log({data})
                setReceivedMessage(data.data);
            }
        );
        socket.on("getUsersOnline",data => {
            setUserOnlines(data);
        })
    }, []);
    // user chat online
    useEffect(() => {
        socket.emit('currentUserOnline', {userId: id})
    }, [id])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== id);
        const online = userOnlines.find((user) => user.userId === chatMember);
        return !!online;
    };
    return (
        <>
            <div className={`h-screen
            bg-[url(https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg)]
            bg-center bg-repeat bg-cover `}>
                <div className={`header grid grid-cols-12 px-[10px] py-[20px] h-[10%]`}>
                    <div className="col-start-1 col-end-4 flex items-center w-full ">
                        <div className="max-w-sm flex-1">
                            <div className="relative">
                                <input type="text"
                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500
                                   focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900
                                   dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                                   bg-[#e3e6e6] outline-0"
                                       placeholder="Tìm kiếm"/>
                                <button type="button"
                                        className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none
                                            dark:focus:ring-1 dark:focus:ring-gray-600 bg-[#ff7929]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
                                         className="text-[#ffff]">
                                        <path
                                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-start-4 col-end-13 ml-[10px]  boder rounded-[5px]  flex items-center flex-row-reverse gap-3">
                        <button className="m-0">
                                <span
                                    className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600"><span
                                    className="text-sm font-medium text-white leading-none">{name}</span>
                                </span>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" width="34" viewBox="0 0 448 512">
                                <path
                                    d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                {!chats || chats.length === 0 ?
                    <>
                        <div className="grid grid-cols-12 px-[10px]">
                            <div className="col-start-1 col-end-4  bg-[#ffff] boder rounded-[15px] h-[700px]">
                                <h1 className={"mt-[20px] pl-[10px] mb-[15px] flex items-center justify-between"}>
                                    <span className={"text-[26px] font-[600]"}>Chat</span>
                                    <span
                                        className={"text-[13px] font-[400] cursor-pointer bg-[#ededed] p-[8px]  rounded-[15px] mr-1"}>Tạo mới+</span>
                                </h1>
                                <hr/>
                                <div className="h-[80%]"></div>
                            </div>
                            <div
                                className="col-start-4 col-end-13 ml-[10px] bg-[#ffff] boder rounded-[15px] h-[100%]">
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className={`grid grid-cols-12 px-[10px] h-[80%]`}>
                            <div className={"col-start-1 col-end-4  bg-[#ffff] border rounded-[15px] h-[100%]"}>
                                <h1 className={"flex items-center justify-between px-[20px] h-[10%]"}>
                                    <span className={"text-[26px] font-[600]"}>Chat</span>
                                    <span
                                        className={"text-[13px] font-[400] cursor-pointer bg-[#ededed] p-[8px]  rounded-[15px] mr-1"}>Tạo mới+</span>
                                </h1>
                                <hr/>
                                <div className="overflow-y-scroll h-[80%]">
                                    {chats.map((item, index) => (
                                        <div
                                            className={`flex mx-[4px] px-[10px] py-[15px] cursor-pointer rounded-[15px] ${currentChat === item && 'bg-[#ededed]'}`}
                                            key={`ok${index}`}
                                            onClick={() => handlerSelectChat(item)}>
                                            <Conversation
                                                data={item}
                                                currentUser={id}
                                                online={checkOnlineStatus(item)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className="col-start-4 col-end-13 ml-[10px] bg-[#ffff] border rounded-[15px] h-[100%]">
                                <ChatBox
                                    chat={currentChat}
                                    currentIdUser={id}
                                    currentNameUser={name}
                                    handleInputOnChange={handleInputOnChange}
                                    handleSendMessage={handleSendMessage}
                                    content={content}
                                    receivedMessage={receivedMessage}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default Chat;