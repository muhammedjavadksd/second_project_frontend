import React from 'react'

function BannerForCreating({ image, title, subTitle, circle_image_design }) {
  return (
    <div className='flex text-center items-center justify-center flex-col mb-10'>
      {
        circle_image_design ?
          <div className='bg-white rounded-full mb-5'>
            <img height={"500px"} width={"500px"} src={image} alt="" />
          </div> :
          <img height={"500px"} width={"500px"} src={image} alt="" />
      }

      <h4 className='text-4xl text-blue-600 font-medium'>{subTitle}</h4>
      <h2>{title}</h2>
    </div>
  )
}

export default BannerForCreating