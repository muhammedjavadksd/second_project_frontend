"use client"
import AccountTab from "@/component/Account/AccountTab/ProfileTab";
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import BreadCrumb from "@/component/Util/BreadCrumb";


function ChatWithBloodDonors(): React.ReactElement {

    return (
        <>
            <div className="flex gap-5">
                <ChatScreen></ChatScreen>
            </div>
        </>
    )
}

const ChatScreen = () => {
    return (
        <div style={{ height: "500px" }} className="flex  bg-gray-100 w-full">
            {/* Left Panel: Users List */}
            <div className="w-1/4  bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Chats</h2>
                <ul className="space-y-2">
                    {[1, 2, 3].map((user, index) => (
                        <li key={index} className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${index % 2 === 0 ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            <img className="w-10 h-10 rounded-full object-cover" src={`https://via.placeholder.com/50?text=U${user}`} alt={`User ${user}`} />
                            <div className="ml-3">
                                <p className="text-gray-800 dark:text-gray-100 font-semibold">User {user}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Last message...</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Panel: Chat Window */}
            <div className="w-1/2 bg-gray-100  border-r border-gray-300 dark:border-gray-700 flex flex-col">
                <div className="flex items-center p-4 border-b border-gray-300 dark:border-gray-700">
                    <img className="w-12 h-12 rounded-full object-cover" src="https://via.placeholder.com/50?text=User" alt="Current User" />
                    <div className="ml-3">
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">Current User</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Online</p>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-4">
                        <li className="flex justify-start">
                            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-md">
                                <p>Hello there!</p>
                            </div>
                        </li>
                        <li className="flex justify-end">
                            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg shadow-md">
                                <p>Hi! How can I help you?</p>
                            </div>
                        </li>
                        {/* More messages */}
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

            {/* Right Panel: Current User Profile */}
            <div className="w-1/4  bg-gray-100 dark:bg-gray-800 p-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Profile</h2>
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-900" src="https://via.placeholder.com/100?text=User" alt="Profile" />
                    <div className="ml-4">
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">Current User</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location: City</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Status: Available</p>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">Send Message</button>
                </div>
            </div>
        </div>
    )
};



export default ChatWithBloodDonors