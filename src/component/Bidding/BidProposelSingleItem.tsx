

function BidProposalSingleItem() {

    return (
        <div className="flex flex-col p-4 bg-gray-100  rounded-md mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <a href="/u/divyadhakecha1?ref_project_id=38496470" className="flex items-center">
                        <img
                            src="https://cdn2.f-cdn.com/ppic/224842181/logo/14133910/profile_logo_14133910.jpg?image-optimizer=force&format=webply&width=120"
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                            <span className="text-gray-800 font-semibold">Dayaben D.</span>
                            <span className="text-gray-600 text-sm block">@divyadhakecha1</span>
                        </div>
                    </a>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
            </div>

            {/* Bid Details */}
            <div className="mb-2">
                <p className="text-sm text-gray-600">
                    bid ₹20,000.00 INR to complete in 7 day(s)
                </p>
            </div>

            {/* Bid Description */}
            <div className="mb-4">
                <p className="text-sm text-gray-700 truncate">
                    App design Expert:...
                    <button className="text-blue-500 hover:underline ml-1">more</button>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center">
                <a
                    href="/projects/38496470?awardBid=427555462&externalBid=false"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                >
                    Award Project
                </a>
                <button className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    <span className="mr-2">Chat</span>
                </button>
            </div>
        </div>
    )
}

export default BidProposalSingleItem