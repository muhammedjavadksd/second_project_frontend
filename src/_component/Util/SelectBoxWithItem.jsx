import React from 'react'

function SelectBoxWithItem({options}) {
    return (
        <div>
            <div>
                <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Assigned to</label>
                <div class="relative mt-2">
                    <button type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                        {
                            options[0]    
                        }
                    </button>


                    <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">

                        <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                            {/* <SelectRaiserOPTION name={"Tim Hook"} /> */}
                            {
                                options.map((each)=>{
                                    return each
                                })
                            }
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SelectBoxWithItem