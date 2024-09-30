import BiddingItemCard from "@/component/Bidding/BiddingItemCard"
import Header from "@/component/Header/Header"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"

function BiddingListing() {

    return (
        <>
            <Header />
            <div className='container mx-auto mt-5 mb-5 '>
                <BreadCrumb path={['Home', 'Bidding', 'Listing']} />
                <div className="mt-5 flex w-full">
                    <div className="w-1/4">
                        <aside className="w-72 p-6 bg-white h-full shadow-2xl rounded-lg">
                            {/* Sidebar Header */}
                            <div className="mb-8 flex items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Filter Items</h2>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                    Category
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    <label className="inline-flex items-center cursor-pointer hover:text-indigo-600">
                                        <input type="checkbox" className="form-checkbox text-indigo-600" />
                                        <span className="ml-2 text-gray-700">Electronics</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer hover:text-indigo-600">
                                        <input type="checkbox" className="form-checkbox text-indigo-600" />
                                        <span className="ml-2 text-gray-700">Fashion</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer hover:text-indigo-600">
                                        <input type="checkbox" className="form-checkbox text-indigo-600" />
                                        <span className="ml-2 text-gray-700">Home & Garden</span>
                                    </label>
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">

                                    Price Range
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600"
                                        placeholder="$ Min"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-600"
                                        placeholder="$ Max"
                                    />
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                    Rating
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    <label className="inline-flex items-center cursor-pointer hover:text-indigo-600">
                                        <input type="radio" name="rating" className="form-radio text-indigo-600" />
                                        <span className="ml-2 text-gray-700">4 stars & up</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer hover:text-indigo-600">
                                        <input type="radio" name="rating" className="form-radio text-indigo-600" />
                                        <span className="ml-2 text-gray-700">3 stars & up</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer hover:text-indigo-600">
                                        <input type="radio" name="rating" className="form-radio text-indigo-600" />
                                        <span className="ml-2 text-gray-700">2 stars & up</span>
                                    </label>
                                </div>
                            </div>
                        </aside>

                    </div>
                    <div className="w-5/6">
                        <div className="grid grid-cols-3 gap-5">
                            <BiddingItemCard />
                            <BiddingItemCard />
                            <BiddingItemCard />
                            <BiddingItemCard />
                            <BiddingItemCard />
                            <BiddingItemCard />
                            <BiddingItemCard />
                            <BiddingItemCard />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BiddingListing