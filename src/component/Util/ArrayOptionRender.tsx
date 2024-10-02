import React, { Fragment } from "react"

function ArrayRender({ data, callBack }: { data: string[], callBack: Function }) {
    return (
        <Fragment>
            {
                data && data.length ? (
                    data.map((item) => {
                        return (
                            <li key={item} role="menuitem" className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                onClick={() => {
                                    callBack(item)
                                }}
                            >
                                {item}
                            </li>
                        )
                    })
                ) : (
                    <li role="menuitem"
                        className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900" >
                        No item found
                    </li>
                )
            }
        </Fragment >
    )
}

export default ArrayRender