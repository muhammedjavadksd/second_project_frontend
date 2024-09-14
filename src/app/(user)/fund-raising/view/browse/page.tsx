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
import { Fragment, useEffect, useState } from "react"

function AdvanceFundRaiserView() {

    const [isCategoryOpen, setCategoryOpen] = useState(false)
    const [isSubCategoryOpen, setSubCategoryOpen] = useState(false)
    const [profile, setProfile] = useState<FundRaiserResponse[]>([])
    const [tempProfile, setTempProfile] = useState<FundRaiserResponse[]>([])
    const [queryFilter, setQueryFilter] = useState<string>()
    const [refresh, setRefresh] = useState<boolean>(false)

    const [categorySelect, setSelectedCategory] = useState(null)
    const [subCategorySelect, setSelectedSubCategory] = useState(null)
    const [stateSelect, setSelectedState] = useState(null)
    const [urgentSelected, setUrgentSelected] = useState(null)
    const [minPrice, setMin] = useState<string>(null)
    const [maxPrice, setMax] = useState<string>(null)

    useEffect(() => {
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
        if (minPrice) {
            objectFind.min = minPrice;
        }
        if (maxPrice) {
            objectFind.max = maxPrice;
        }
        const queryString = new URLSearchParams(objectFind).toString();
        setQueryFilter(queryString)
        setRefresh(!refresh)
    }, [categorySelect, subCategorySelect, stateSelect, urgentSelected, maxPrice, minPrice])


    function resetFilter() {
        setSelectedCategory(null)
        setSelectedSubCategory(null)
        setSelectedState(null)
        setUrgentSelected(null)
        setMin("")
        setMax("")
    }


    return (
        <Fragment>
            <Header />
            <div className='container mx-auto mt-5 mb-5 '>
                <BreadCrumb path={['Home', 'Fund Raiser', 'Browse']} />
                {minPrice}

                <div className="w-full  t-5 gap-5">
                    <div className="mb-5">

                        <div className="flex mt-3 gap-5 items-center justify-between">
                            <div className="flex gap-2">
                                <DropDownItem isOpen={isCategoryOpen} options={Object.keys(const_data.FUNDRAISER_CATEGORY)} title="Select category" callBack={(val) => setSelectedCategory(val)}></DropDownItem>
                                <DropDownItem isOpen={isSubCategoryOpen} options={categorySelect ? const_data.FUNDRAISER_CATEGORY[categorySelect] : []} title="Select sub category" callBack={(val) => setSelectedSubCategory(val)}></DropDownItem>
                                <DropDownItem isOpen={isSubCategoryOpen} options={['Urgent', 'Not urgent']} title="Select Urgency" callBack={(val) => setUrgentSelected(val)}></DropDownItem>
                                <DropDownItem isOpen={isSubCategoryOpen} options={Object.keys(const_data.STATE_WITH_DISTRICT)} title="Select State" callBack={(val) => setSelectedState(val)}></DropDownItem>
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
                                    onChange={(e) => setMin(e.target.value)}
                                    value={minPrice}
                                    type="text"
                                    id="min-value"
                                    placeholder="Min"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Max Value Input */}
                            <div className="flex flex-col">

                                <input
                                    value={maxPrice}
                                    onChange={(e) => setMax(e.target.value)}
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
                                    <div className="grid grid-cols-3 mt-5">
                                        {
                                            response.map((profile) => {
                                                return <FundRaiserSingleItem profile={profile} />
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