import { ChatFrom } from "@/util/types/Enums/BasicEnums"
import { ICurrentUser, IMessageTemplate } from "@/util/types/InterFace/UtilInterface"




function SingleChatScreen({ msg, current_user }: { msg: IMessageTemplate[], current_user: ICurrentUser }) {

    console.log(msg)
    return (<div className="w-1/2 bg-gray-100  border-r border-gray-300 dark:border-gray-700 flex flex-col">
        <div className="flex items-center p-4 border-b border-gray-300 dark:border-gray-700">
            <img className="w-12 h-12 rounded-full object-cover" src="https://via.placeholder.com/50?text=User" alt="Current User" />
            <div className="ml-3">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{current_user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Online</p>
            </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-4">
                {
                    msg?.map((message) => {
                        return (
                            <li className="flex justify-start">
                                <div className="bg-gray-200 w-3/5 dark:bg-gray-700 p-3 rounded-lg shadow-md">
                                    <p>{message.msg}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div className="flex items-center p-3 border-t border-gray-300 dark:border-gray-700">
            <input type="text" placeholder="Type a message..." className="flex-1 p-2 rounded-full bg-gray-100 dark:bg-gray-700 outline-none placeholder-gray-500 dark:placeholder-gray-400" />
            <button className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </div>
    </div>
    )
}

export default SingleChatScreen