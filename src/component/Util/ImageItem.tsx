import React from 'react'

function ImageItem({ imageURL, imageName, onClose }) {
    return (
        <>

            <div className='w-100 p-2 bg-white rounded-lg'>
                <div className='flex gap-4 items-center'>
                    {/* <div style={{ backgroundImage: `url(${BASE_PATH + " / " + each})` }}></div> */}
                    <div style={{ backgroundImage: `url('${imageURL}')`, width: "50px", height: "40px", borderRadius: "21px", backgroundSize: "contain" }} />
                    <div className='flex relative text-ellipsis whitespace-nowrap overflow-hidden   w-full gap-5'>
                        <div style={{ width: "130px" }}>
                            <p className='text-blue-900 text-nowrap underline mb-0 whitespace-nowrap'>{imageName}</p>
                            <span style={{ fontSize: "12px" }}>Tap to view image</span>
                        </div>
                        <button className='bg-red-800 right-0 top-0 bottom-0 min-w-12 text-white rounded-lg absolute' onClick={onClose}><i className="fa-solid fa-trash"></i></button>
                    </div>
                    {/* <img src={BASE_PATH + "/" + each} width={"50px"} height={"80px"} style={{ borderRadius: "50%" }} alt="" /> */}
                </div>
            </div>
        </>
    )
}

export default ImageItem