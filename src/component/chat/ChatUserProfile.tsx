import { confirmAlert } from "react-confirm-alert";
import DangerUIConfirm from "../Util/DangerUIConfirm";
import { useEffect, useState } from "react";
import { blockProfile } from "@/util/data/helper/APIHelper";
import { toast } from "react-toastify";

const ChatUserProfile = ({ isBlock, room_id }: { isBlock: boolean, room_id?: string }) => {


    const [block, setBlock] = useState<boolean>(isBlock);

    useEffect(() => {
        setBlock(isBlock);
    }, [])


    function blockConfirm() {
        const status = block ? "unblock" : "block"
        blockProfile(status, "123").then((data) => {
            if (data.status) {
                toast.success("Profile blocked")
            } else {
                toast.error(data.msg)
            }
        }).catch((err) => {
            console.log("Something went wrong");
        })
    }

    function blockProfileEvent() {
        confirmAlert({
            title: "Are you want to block this profile?",
            message: "Block this profile?",
            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm onClose={onClose} onConfirm={blockConfirm} title={title} />
                )
            }
        })
    }

    return (

        <div style={{ height: "600px" }} className="flex  bg-gray-100 w-full">
            <div className="w-full  bg-gray-100 dark:bg-gray-800 p-4">
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
                    <button onClick={() => blockConfirm()} className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">Block user</button>
                </div>
            </div>
            {/* <SingleChat /> */}
        </div >
    )
};

export default ChatUserProfile