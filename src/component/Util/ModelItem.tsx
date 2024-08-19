import React, { useEffect, useState } from 'react'

function ModelItem({ children, isOpen, onClose, ZIndex, closeOnOutSideClock }) {

    let [isModelOpen, setModelOpen] = useState<boolean>(false)

    useEffect(() => {
        setModelOpen(isOpen ? true : false)
    }, [isOpen])

    function closeThisModel(): void {
        setModelOpen(false)
        onClose()
    }

    return (
        <>

            <div style={{ zIndex: ZIndex }} onClick={() => closeOnOutSideClock && closeThisModel()} className={`${!isModelOpen && "hidden"}   top-0 left-0 right-0 bg-black bg-opacity-80 flex items-center justify-center fixed w-full h-screen`}>
                <div className="modelScreen" onClick={(e) => { e.stopPropagation() }}>
                    {children}
                </div>
            </div></>
    )
}

export default ModelItem