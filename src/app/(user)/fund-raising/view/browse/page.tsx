"use client"
import FundRaiserSingleItem from "@/component/FundRaiser/FundRaiserSingleItem"
import Header from "@/component/Header/Header"
import BreadCrumb from "@/component/Util/BreadCrumb"
import DropDownItem from "@/component/Util/DropdownItem"
import EmptyScreen from "@/component/Util/EmptyScreen"
import Footer from "@/component/Util/Footer"
import PaginationSection from "@/component/Util/PaginationSection"
import const_data from "@/util/data/const"
import { getLimitedFundRaiserPost, getSingleActiveFundRaiser } from "@/util/data/helper/APIHelper"
import { FundRaiserResponse } from "@/util/types/API Response/FundRaiser"
import { Fragment, useEffect, useRef, useState } from "react"

function AdvanceFundRaiserView() {

    const [isCategoryOpen, setCategoryOpen] = useState(false)
    const [isSubCategoryOpen, setSubCategoryOpen] = useState(false)
    const [queryFilter, setQueryFilter] = useState<string>()
    const [refresh, setRefresh] = useState<boolean>(false)

    const [categorySelect, setSelectedCategory] = useState(null)
    const [subCategorySelect, setSelectedSubCategory] = useState(null)
    const [stateSelect, setSelectedState] = useState(null)
    const [urgentSelected, setUrgentSelected] = useState(null)
    const minPrice = useRef(null)
    const maxPrice = useRef(null)
    const [minThrottle, setMinThrottle] = useState<boolean>(false)

    function onPriceChange(val) {
        if (minThrottle) {
            return;
        }
        console.log("Api call");

        filterData()
        setTimeout(() => {
            setMinThrottle(false)
        }, 2000)
    }

    function filterData() {
        const objectFind: Record<string, any> = {};

        if (subCategorySelect) {
            objectFind.sub_category = subCategorySelect;
        }

        if (stateSelect) {
            objectFind.state = stateSelect;
        }

        if (urgentSelected) {
            objectFind.urgency = urgentSelected;
        }
        if (minPrice.current && minPrice.current.value) {
            objectFind.min = minPrice.current.value;
        }
        if (maxPrice.current && maxPrice.current.value) {
            objectFind.max = maxPrice.current.value;
        }

        const queryString = new URLSearchParams(objectFind).toString();
        setQueryFilter(queryString || "")
        setRefresh(!refresh)
    }

    useEffect(() => {
        filterData()
    }, [categorySelect, subCategorySelect, stateSelect, urgentSelected, maxPrice, minPrice])


    function resetFilter() {
        minPrice.current.value = null
        maxPrice.current.value = null
        setSelectedCategory(null)
        setSelectedSubCategory(null)
        setSelectedState(null)
        setUrgentSelected(null)
    }


    return (
        <Fragment>
            <Header />

            <div className='container mx-auto px-4 md:px-8 mt-5'>
                <BreadCrumb path={['Home', 'Fund Raiser', 'Browse']} />

                <div className="w-full  t-5 gap-5">
                    <div className="mb-5">

                        <div className="flex mt-3 gap-5 items-center justify-between">
                            <div className="flex gap-2">
                                <DropDownItem value={categorySelect} isOpen={isCategoryOpen} options={Object.keys(const_data.FUNDRAISER_CATEGORY)} title="Select category" callBack={(val) => setSelectedCategory(val)}></DropDownItem>
                                <DropDownItem value={subCategorySelect} isOpen={isSubCategoryOpen} options={categorySelect ? const_data.FUNDRAISER_CATEGORY[categorySelect] : []} title="Select sub category" callBack={(val) => setSelectedSubCategory(val)}></DropDownItem>
                                <DropDownItem value={urgentSelected} isOpen={isSubCategoryOpen} options={['urgent', 'Not urgent']} title="Select Urgency" callBack={(val) => setUrgentSelected(val)}></DropDownItem>
                                <DropDownItem value={stateSelect} isOpen={isSubCategoryOpen} options={Object.keys(const_data.STATE_WITH_DISTRICT)} title="Select State" callBack={(val) => setSelectedState(val)}></DropDownItem>
                            </div>
                            <button onClick={resetFilter} className="bg-red-500 p-2 py-2 px-4 rounded-lg text-white flex gap-2 items-center">
                                <i className="fa-solid fa-rotate-right"></i>
                                Reset filter
                            </button>
                        </div>
                        <div className="flex mt-3 items-center space-x-4">
                            {/* Min Value Input */}
                            <div className="flex flex-col">
                                <input
                                    ref={minPrice}
                                    onChange={(e) => onPriceChange(e.target.value)}
                                    type="text"
                                    id="min-value"
                                    placeholder="Min"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Max Value Input */}
                            <div className="flex flex-col">

                                <input
                                    ref={maxPrice}
                                    onChange={(e) => onPriceChange(e.target.value)}
                                    type="text"
                                    id="max-value"
                                    placeholder="Max"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <PaginationSection
                            api={
                                {
                                    renderType: async (page, limit) => {
                                        return await getLimitedFundRaiserPost(page, limit, categorySelect || "all", queryFilter)
                                    }
                                }
                            }
                            paginationProps={{
                                current_page: 1,
                                currentLimit: 8
                            }}
                            refresh={refresh}
                            itemsRender={(response: FundRaiserResponse[]) => {

                                if (!response.length) {
                                    return (
                                        <div className="mt-3">
                                            <EmptyScreen msg="No profile found" />
                                        </div>
                                    )
                                }
                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-5">
                                        {
                                            response.map((profile) => {
                                                return <FundRaiserSingleItem key={profile._id} profile={profile} />
                                            })
                                        }
                                    </div>
                                )
                            }}
                        />


                    </div>
                </div>
            </div>
            <Footer />
        </Fragment >
    )
}



export default AdvanceFundRaiserView