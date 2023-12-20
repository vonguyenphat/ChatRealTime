import React, {useEffect, useState} from 'react';
import {findUserById} from "../services/UserService";

function Conversation({data, currentUser, online}) {
    let userId = data.members.find((id) => id !== currentUser);
    const [user, setUser] = useState({});
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
    return (
        <>
            <div className="hs-tooltip inline-block">
                <div className=" relative inline-block">
                    <span
                        className="flex-shrink-0 inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-600"><span
                        className="text-sm font-medium text-white leading-none">{user.name}</span>
                    </span>
                    {
                        online ?
                            <span
                                className="absolute bottom-0 end-0 block h-3 w-3 rounded-full ring-2 ring-white bg-[#aaeb2a]"></span>
                            :
                            // <span
                            //     className="absolute bottom-0 end-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                            <span
                                className="absolute bottom-0 end-0 block h-3 w-3 rounded-full ring-2 ring-white bg-[#aaeb2a]"></span>
                    }

                </div>
            </div>
            <div className={"flex flex-col ml-[10px]"}>
                <span className={"text-[16px] font-[600]"}>{user.name}</span>
                {online ? <span className={"text-[14px] font-[400] text-[#aaeb2a]"}>Online</span> :
                    <span className={"text-[14px] font-[400] text-[#aaeb2a]"}>Online</span>}
            </div>
        </>
    );
}

export default Conversation;