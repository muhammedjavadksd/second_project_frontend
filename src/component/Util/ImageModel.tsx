import { IImageModel } from '@/util/types/InterFace/PropInterFace'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function ImageModel({ imageURL, isOpen, onImageClose, ZIndex }: IImageModel) {

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

            <div style={{ zIndex: ZIndex }} onClick={() => closeThisModel()} className={`${!isModelOpen && "hidden"}  top-0 left-0 right-0 bg-black bg-opacity-80 flex items-center justify-center fixed w-full h-screen`}>
                <div className="modelScreen" onClick={(e) => e.stopPropagation()}>
                    {imageURL && <Image priority width={300} height={300} style={{ maxWidth: "100%", maxHeight: "500px" }} src={imageURL} alt="" />}
                </div>
            </div></>
    )
}

export default ImageModel