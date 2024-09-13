import ChatUsersList from "./ChatUserList";
import ChatUserProfile from "./ChatUserProfile";
import SingleChat from "./SingleChat";


function ChatComposition({ chat_id }) {
    return (
        <>
            <div className="w-full flex">
                <div className="w-1/4">
                    <ChatUsersList></ChatUsersList>
                </div>
                <div className="w-2/4">
                    <SingleChat chat_id={chat_id} />
                </div>
                <div className="w-1/4">
                    <ChatUserProfile />
                </div>
            </div>
        </>
    )
}

export default ChatComposition