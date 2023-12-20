import React, {useEffect, useState, useRef} from 'react';
import {findUserById} from "../services/UserService";
import {findMessageByChatId} from "../services/MessageService";
import ReactTimeAgo from 'react-time-ago'

function ChatBox({chat, currentIdUser, handleInputOnChange, handleSendMessage, content, receivedMessage}) {
    let inputMessage;
    if (!content) {
        inputMessage = ""
    } else {
        inputMessage = content
    }
    let chatId = chat._id;
    let userId = chat.members.find((id) => id !== currentIdUser);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});
    const container = useRef(null);

    const scrollContainerToBottom = () => {
        container.current.scrollTop = container.current.scrollHeight;
    };

    useEffect(() => {
        scrollContainerToBottom();
    }, [messages]);

    useEffect(() => {
        try {
            const fetchMessages = async () => {
                return await findMessageByChatId(chatId);
            };
            fetchMessages().then((res) => {
                if (res && res.EC === 0) {
                    setMessages(res.DT);
                }
            })
        } catch (e) {
            console.log("Error ", e);
        }
    }, [chatId]);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                return await findUserById(userId);
            }
            fetchUser().then((res) => {
                if (res && res.EC === 0) {
                    setUser(res.DT);
                }
            })
        } catch (e) {
            console.log("error fetch user", e.message);
        }
    }, [userId]);

    useEffect(() => {
        if (receivedMessage && receivedMessage.chatId === chatId) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
    }, [receivedMessage, chatId]);

    return (
        <>
            <div className={"flex px-[10px] pt-[15px] pb-[13px] border h-[10%]"}>
                <div className="hs-tooltip inline-block">
                    <div className=" relative inline-block">
                        <span
                            className="flex-shrink-0 inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-600"><span
                            className="text-sm font-medium text-white leading-none">{user.name}</span>
                        </span>
                        <span
                            className="absolute bottom-0 end-0 block h-3 w-3 rounded-full ring-2 ring-white bg-[#aaeb2a]"></span>
                    </div>
                </div>
                <div className={"flex flex-col ml-[10px] "}>
                    <span className={"text-[16px] font-[600]"}>{user.name}</span>
                    <span className={"text-[14px] font-[400] text-[#aaeb2a]"}>Online</span>
                </div>
                <hr/>
            </div>
            <hr/>
            <div className={"h-[80%]"}>
                <div ref={container} className={"overflow-y-auto xl:h-[530px] lg:h-[500px] md:h-[470px]"}>
                    {/*<div ref={container} className={"overflow-y-auto "}>*/}
                    <ul className="space-y-5 px-[10px] py-[15px] mx-[10px]">
                        {messages.map((item, index) => (
                            <div key={`ok${index}`}>
                                {item.senderId === currentIdUser ?
                                    <>
                                        <li className="flex ms-auto gap-x-2 sm:gap-x-4">
                                            <div className="grow text-end space-y-3">
                                                <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                                                    <p className="text-sm text-white font-[600]">
                                                        {item.content}
                                                    </p>
                                                    <p className={"text-[11px] text-[#ffff]"}>
                                                        <ReactTimeAgo date={new Date(item.createdAt)}/></p>
                                                </div>
                                            </div>
                                            <span
                                                className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-[#ff7929]"><span
                                                className="text-sm font-medium text-white leading-none">You</span></span>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
                                <span
                                    className="flex-shrink-0 inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-600 cursor-default">
                                    <span className="text-sm font-medium text-white leading-none">{user.name}</span>
                                </span>
                                            <div
                                                className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                                                <div className="space-y-1.5">
                                                    <p className="text-sm text-gray-800 dark:text-white">
                                                        {item.content}
                                                    </p>
                                                </div>
                                                <p className={"text-[11px]"}><ReactTimeAgo
                                                    date={new Date(item.createdAt)}/>
                                                </p>
                                            </div>
                                        </li>
                                    </>
                                }
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={"px-[20px] flex items-center justify-center h-[10%]"}>
                <input type="text"
                       className="py-3 px-4 block w-full border border-gray-200 rounded-[20px] bg-[#fcfafa]
                                       text-sm outline-0 "
                       placeholder="Messages"
                       value={inputMessage}
                       onChange={handleInputOnChange}
                />
                <button>
                    <svg className={"text-3xl ml-[35px]"} xmlns="http://www.w3.org/2000/svg"
                         height="1em" viewBox="0 0 512 512">
                        <path
                            d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                </button>
                <button
                    className={"mx-[45px] bg-[#ff7929] py-[10px] px-[25px] border rounded-[5px] text-[#ffff]"}
                    onClick={handleSendMessage}
                >
                    Gửi
                </button>
            </div>
        </>
    );
}

export default ChatBox;