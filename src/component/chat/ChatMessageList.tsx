import { ChatHistory } from "@/util/types/API Response/Profile"


export default function ChatMessageList({ chatHistory, profile_id }: { chatHistory: ChatHistory[], profile_id: string }) {

    const msgComponent = []
    let tempComponent = []
    let lastProfile = null


    chatHistory.map((msg, index) => {
        let outerClass = 'w-full max-w-96 mb-1 first:rounded-se-3xl first:rounded-ss-3xl last:rounded-es-3xl last:rounded-ee-3xl bg-white w-3/5 dark:bg-gray-700 p-3 shadow-md';
        let innerClass = 'flex justify-start';
        let componentClass = 'w-fit'; // Default to align left

        // Check if the message belongs to the current user
        if (msg.profile_id == profile_id && profile_id != null) {
            outerClass = "w-full max-w-96 mb-1 first:rounded-se-3xl first:rounded-ss-3xl last:rounded-es-3xl last:rounded-ee-3xl ml-auto bg-gray-200 w-3/5 dark:bg-gray-700 p-3 shadow-md";
            componentClass = 'w-fit ml-auto'; // Align to the right
        }

        // Check if it's a new sender (profile) compared to the last message
        if (lastProfile != msg.profile_id) {
            // Push the grouped messages from the previous sender
            if (tempComponent.length > 0) {
                msgComponent.push(
                    <div className={lastProfile == profile_id ? 'w-fit ml-auto' : 'w-fit'} key={index - 1}>
                        {tempComponent}
                    </div>
                );
            }
            tempComponent = []; // Reset for the new sender
        }

        // Add the current message to tempComponent
        tempComponent.push(
            <li className={outerClass} key={index}>
                <div className={innerClass}>
                    <p>{msg.msg}</p>
                </div>
            </li>
        );

        // If it's the last message, finalize the grouping
        if (index == chatHistory.length - 1) {
            msgComponent.push(
                <div className={msg.profile_id == profile_id ? 'w-fit ml-auto' : 'w-fit'} key={index + 1}>
                    {tempComponent}
                </div>
            );
        }

        lastProfile = msg.profile_id; // Update the last profile id
    });

    // Return the final component
    return msgComponent;

    // chatHistory.map((msg, index) => {
    //     let outerClass = 'w-full max-w-96 mb-1 first:rounded-se-3xl   first:rounded-ss-3xl last:rounded-es-3xl last:rounded-ee-3xl bg-white w-3/5 dark:bg-gray-700 p-3  shadow-md'
    //     let innerClass = 'flex justify-start';
    //     let componetnClass = 'w-fit';
    //     if (msg.profile_id == profile_id && profile_id != null) {
    //         outerClass = "w-full max-w-96 mb-1 first:rounded-se-3xl   first:rounded-ss-3xl last:rounded-es-3xl last:rounded-ee-3xl ml-auto bg-gray-200 w-3/5 dark:bg-gray-700 p-3  shadow-md"
    //         componetnClass = 'w-fit  ml-auto';
    //     }

    //     if (lastProfile != msg.profile_id) {
    //         msgComponent.push(
    //             <div className={componetnClass}>
    //                 {tempComponent}
    //             </div>
    //         )
    //         tempComponent = []
    //     }

    //     tempComponent.push(<li className={outerClass}>
    //         <div className={innerClass}>
    //             <p>{msg.msg}</p>
    //         </div>
    //     </li>)

    //     if (index == (chatHistory.length - 1)) {
    //         msgComponent.push(
    //             <div className={componetnClass}>
    //                 {tempComponent}
    //             </div>
    //         )
    //         tempComponent = []
    //     }

    //     lastProfile = msg.profile_id;
    // })


    // // alert(msgComponent.length)

    // return msgComponent
}