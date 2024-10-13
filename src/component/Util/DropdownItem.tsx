import { Fragment, useEffect, useRef, useState } from "react"
import ArrayRender from "./ArrayOptionRender";
import ObjectOptionRender from "./ObjectOptionRender";
import { IOptionLabel } from "@/util/types/InterFace/UtilInterface";


function DropDownItem({ title, options, isOpen, callBack, optionsType }: { title: string, isOpen: boolean, callBack: Function, options?: string[], optionsType?: IOptionLabel[] }) {

    let [isVisible, setVisible] = useState(isOpen);
    const ref = useRef(null)

    function onSelect(val) {
        setVisible(false)
        callBack(val)
    }

    useEffect(() => {
        const event = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setVisible(false)
            }
        };

        document.addEventListener("click", event);

        return () => {
            return document.removeEventListener("click", event)
        }
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setVisible(!isVisible)} data-ripple-light="true" data-popover-target="menu-1" data-popover-nested="true"
                className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                {title}

            </button>
            <ul role="menu" data-popover="menu-1" data-popover-placement="bottom" className={`${!isVisible && "hidden"} w-64 max-h-56 absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                {
                    options ? <ArrayRender callBack={onSelect} data={options} /> : <ObjectOptionRender callBack={onSelect} data={optionsType} />
                }
            </ul>
        </div >
    )
}

export default DropDownItem