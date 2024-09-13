import { useEffect, useState } from "react";
import SingleChatScreen from "../section/SingleChatScreen";
import { getSingleChat } from "@/util/data/helper/APIHelper";
import { IChatTemplate, ChatProfile } from "@/util/types/API Response/Profile";

function SingleChat({ chat_id }) {

    const [currentChat, setCurrentChat] = useState<ChatProfile | false>(null)

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