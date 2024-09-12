import { Fragment, useState } from "react"


function DropDownItem({ title, options, isOpen, callBack }: { title: string, options: string[], isOpen: boolean, callBack: Function }) {

    let [isVisible, setVisible] = useState(isOpen);

    return (
        <div className="relative">
            <button onClick={() => setVisible(!isVisible)} data-ripple-light="true" data-popover-target="menu-1" data-popover-nested="true"
                className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                {title}
            </button>
            <ul role="menu" data-popover="menu-1" data-popover-placement="bottom"
                className={`${!isVisible && "hidden"} w-64 max-h-56 absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                {
                    !options.length ? (
                        <li role="menuitem"
                            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            No item found
                        </li>
                    ) : options.map((item) => {
                        return (
                            <li role="menuitem"
                                className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                onClick={() => {
                                    callBack(item)
                                    setVisible(false)
                                }}
                            >
                                {item}
                            </li>
                        )
                    })
                }

            </ul>
        </div >
    )
}

export default DropDownItem