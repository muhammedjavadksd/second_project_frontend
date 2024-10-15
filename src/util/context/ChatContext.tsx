import React, { Fragment, useState } from "react"
import { ChatHistoryContext } from "./Context"
import { ChatHistory } from "../types/API Response/Profile"


function ChatHistoryContextWrapper({ children }) {

    const [chatLog, setChatHistory] = useState<ChatHistory[]>([])

    return (
        <Fragment>
            <ChatHistoryContext.Provider value={{ chatLog, setChatHistory }}>
                {children}
            </ChatHistoryContext.Provider>
        </Fragment >
    )
}

export default ChatHistoryContextWrapper