import { Fragment, useEffect, useState } from "react";
import AvatarIcon from "../Util/avatarIcon";
import { IChatMessageDetails } from "@/util/types/InterFace/UtilInterface";


function ChatPerson({ name, chat, unseen_message_count }: { name: string, chat: IChatMessageDetails, unseen_message_count: number }) {

    const [messages, setMessage] = useState<IChatMessageDetails>(null);
    useEffect(() => {
        console.log("From use efefct");

        console.log(chat);

        setMessage(chat)
    }, [unseen_message_count, chat])

    if (!messages) return null

    return (
        <Fragment>
            <li className={`${unseen_message_count > 0 && 'bg-blue-200 '} px-2  mb-3 cursor-pointer hover:bg-white border-b  py-2 rounded-lg flex gap-5`}>
                <div>
                    <AvatarIcon name={name} />
                </div>
                <div className={` flex justify-between w-full items-center`}>
                    <div className="flex-grow">
                        <h3 className="text-md font-semibold">{name}</h3>
                        {unseen_message_count > 0 ? (
                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {messages.last_message}
                            </span>
                        ) : <p className="text-gray-500 text-sm truncate">{messages.last_message}</p>}
                    </div>
                    {unseen_message_count > 0 && <span className="bg-blue-600 rounded-full text-white p-1 px-1.5 text-[10px]">{unseen_message_count}</span>}

                </div>
            </li>
        </Fragment >
    )
}

export default ChatPerson