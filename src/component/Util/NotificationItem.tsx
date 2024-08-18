

function NotificationItem() {

    return (
        <div className="px-4 py-2 sm:px-0">
            <div className="space-y-4">
                <div className="bg-white shadow rounded-lg p-4 border-t border-gray-200">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">

                            <svg
                                className="h-6 w-6 text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 8a6 6 0 10-12 0 6 6 0 0012 0zM9 12a3 3 0 016 0h2a5 5 0 00-10 0h2zm-2.878-4.035a.75.75 0 10-1.06-1.06L1.5 9.207V10h1.293l3.328-3.328zM4.5 5h-.293l2.585-2.585a.75.75 0 10-1.06-1.06L1 3.5V2h1.5a.5.5 0 01.5.5V5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                Notification Title
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Notification description goes here
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                        <p>Just now</p>
                        <button
                            type="button"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationItem