import { ChatHistory } from "@/util/types/API Response/Profile"
import AvatarIcon from "../Util/avatarIcon";


export default function ChatMessageList({ chatHistory, profile_id, my_name, sender_name }: { chatHistory: ChatHistory[], profile_id: string, my_name: string, sender_name: string }) {

    const msgComponent = chatHistory && chatHistory.map((msg, index) => {

        if (msg.profile_id != profile_id && profile_id != null) {
            return <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <AvatarIcon name={my_name} />
                    </div>
                    <div
                        className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                        <div>

                            {msg.msg}
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                    <div
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                        <AvatarIcon name={sender_name} />
                    </div>
                    <div
                        className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                        <div>
                            {msg.msg}
                        </div>
                    </div>
                </div>
            </div>
        }
    });

    return msgComponent;
}