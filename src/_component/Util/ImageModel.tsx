import { IImageModel } from '@/types/InterFace/PropInterFace'
import React, { useEffect, useState } from 'react'

function ImageModel({ imageURL, isOpen, onImageClose }: IImageModel) {

    let [isModelOpen, setModelOpen] = useState<boolean>(false)

    useEffect(() => {
        setModelOpen(isOpen ? true : false)
    }, [isOpen])

    function closeThisModel(): void {
        setModelOpen(false)
        onImageClose()
    }

    return (
        <>

            <div onClick={() => closeThisModel()} className={`${!isModelOpen && "hidden"} top-0 left-0 right-0 bg-black bg-opacity-80 flex items-center justify-center fixed w-full h-screen`}>
                <div className="modelScreen" onClick={(e) => e.stopPropagation()}>
                    <img style={{ maxWidth: "100%", maxHeight: "500px" }} src={imageURL} alt="" />
                </div>
            </div></>
    )
}

export default ImageModel