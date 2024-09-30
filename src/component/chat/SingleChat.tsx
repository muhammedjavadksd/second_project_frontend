import { useEffect, useState } from "react";
import SingleChatScreen from "../section/SingleChatScreen";
import { getSingleChat } from "@/util/data/helper/APIHelper";
import { ChatProfile, ChatHistory } from "@/util/types/API Response/Profile";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";

function SingleChat({ chat_id }) {

    const [currentChat, setCurrentChat] = useState<ChatProfile | false>(null)
    const session = useSession();

    async function getChat() {
        getSingleChat(chat_id).then((data) => {
            if (data) {
                console.log(data);
                setCurrentChat(data)
            }
        }).catch((err) => { })
    }




    useEffect(() => {
        getChat()
    }, [])

    if (!currentChat) {
        return null
    }

    return (
        <SingleChatScreen
            room_id={chat_id}
            current_user={{
                name: (currentChat.chat_person.first_name.concat(" ", currentChat.chat_person.last_name)),
            }}
            msg={
                currentChat.chat_history
            }
        />

    )
}

export default SingleChat