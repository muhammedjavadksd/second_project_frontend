import React, { Fragment, useEffect, useState } from "react";
import { FaComment, FaFacebookMessenger, FaInbox, FaTimes } from "react-icons/fa";
import ChatUserList from "./ChatList";
import ChatDetail from "./ChatDetail";
import ModelItem from "../Util/ModelItem";
import { useSession } from "next-auth/react";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import ChatHistoryContextWrapper from "@/util/context/ChatContext";
import firebaseApp, { firebaseNotification } from "@/util/external/firebase/firebase-config";
import { getToken } from "firebase/messaging";

function ChatToggle() {

    const [isOpen, toggleModle] = useState(false);
    const session = useSession();
    const [userDetails, setUserDetails] = useState(null);


    useEffect(() => {
        setUserDetails(userDetailsFromUseSession(session, "user"))
    }, [session])

    return (
        <Fragment>



            {isOpen && (
                <ChatHistoryContextWrapper>
                    <ModelItem ZIndex={100} closeOnOutSideClock={true} isOpen={true} onClose={() => toggleModle(false)}>
                        <ChatUserList />
                    </ModelItem>
                </ChatHistoryContextWrapper>
            )}

            {userDetails && <div className="fixed right-10 z-[99] bottom-10">
                <button
                    onClick={() => toggleModle(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    aria-label="Open chat modal"
                >
                    <FaComment className="inline-block mr-2" />
                    View messages
                </button>
            </div>
            }
        </Fragment>
    )
}

export default React.memo(ChatToggle)