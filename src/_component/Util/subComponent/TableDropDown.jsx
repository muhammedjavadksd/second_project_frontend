import React from 'react'

function TableDropDown({ toggleRows, rows }) {

    return (
        <div className='absolute'>
            <div class={`z-10 ${!toggleRows && 'hidden'} w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{ position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(522.5px, 3847.5px, 0px);" }}`}>
                <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                    {
                        rows.map((each,index) => {
                            return (
                                <li>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id={`filter-radio-example-${index}`} type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for={`filter-radio-example-${index}`} class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{each} Rows</label>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}

export default TableDropDown