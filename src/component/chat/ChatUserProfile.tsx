const ChatUserProfile = () => {

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
                    <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">Block user</button>
                </div>
            </div>
            {/* <SingleChat /> */}
        </div >
    )
};

export default ChatUserProfile