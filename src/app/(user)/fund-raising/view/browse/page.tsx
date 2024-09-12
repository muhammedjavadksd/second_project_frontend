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
        const queryString = new URLSearchParams(objectFind).toString();
        setQueryFilter(queryString)
        setRefresh(!refresh)
    }, [categorySelect, subCategorySelect, stateSelect, urgentSelected])



    return (
        <Fragment>
            {queryFilter}
            <Header />
            <div className='container mx-auto mt-5 mb-5 '>
                <BreadCrumb path={['Home', 'Fund Raiser', 'Browse']} />


                <div className="w-full  mt-5 gap-5">
                    <div className="mb-5">
                        {/* <form noValidate className="flex items-center space-x-2">
                            <input
                                autoCapitalize="off"
                                autoCorrect="off"
                                role="textbox"
                                spellCheck="false"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search for fundraisers"
                            />
                            <button
                                type="submit"
                                title="Submit"
                                className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg viewBox="0 0 40 40" width="20" height="20" className="fill-current">
                                    <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
                                </svg>
                            </button>
                            <button
                                type="reset"
                                title="Reset"
                                className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                hidden
                            >
                                <svg viewBox="0 0 20 20" width="16" height="16" className="fill-current">
                                    <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
                                </svg>
                            </button>
                            <span className="hidden">
                                <svg width="16" height="16" viewBox="0 0 38 38" stroke="#444" className="animate-spin">
                                    <g fill="none" fillRule="evenodd">
                                        <g transform="translate(1 1)" strokeWidth="2">
                                            <circle strokeOpacity=".5" cx="18" cy="18" r="18"></circle>
                                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                                <animateTransform
                                                    attributeName="transform"
                                                    type="rotate"
                                                    from="0 18 18"
                                                    to="360 18 18"
                                                    dur="1s"
                                                    repeatCount="indefinite"
                                                ></animateTransform>
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </form> */}
                        <div className="flex mt-3 gap-5 items-center">
                            <DropDownItem isOpen={isCategoryOpen} options={Object.keys(const_data.FUNDRAISER_CATEGORY)} title="Select category" callBack={(val) => setSelectedCategory(val)}></DropDownItem>
                            <DropDownItem isOpen={isSubCategoryOpen} options={categorySelect ? const_data.FUNDRAISER_CATEGORY[categorySelect] : []} title="Select sub category" callBack={(val) => setSelectedSubCategory(val)}></DropDownItem>
                            <DropDownItem isOpen={isSubCategoryOpen} options={['Urgent', 'Not urgent']} title="Select Urgency" callBack={(val) => setUrgentSelected(val)}></DropDownItem>
                            <DropDownItem isOpen={isSubCategoryOpen} options={Object.keys(const_data.STATE_WITH_DISTRICT)} title="Select State" callBack={(val) => setSelectedState(val)}></DropDownItem>
                        </div>
                        <div className="flex mt-3 items-center space-x-4">
                            {/* Min Value Input */}
                            <div className="flex flex-col">

                                <input
                                    type="number"
                                    id="min-value"
                                    placeholder="Min"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Max Value Input */}
                            <div className="flex flex-col">

                                <input
                                    type="number"
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