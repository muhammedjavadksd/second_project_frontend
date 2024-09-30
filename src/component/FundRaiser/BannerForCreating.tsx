import Image from 'next/image'
import React from 'react'

function BannerForCreating({ image, title, subTitle, circle_image_design }) {
  return (
    <div className='flex text-center items-center justify-center flex-col mb-10'>
      {
        circle_image_design ?
          <div className='bg-white rounded-full mb-5'>
            <Image height={500} width={500} src={image} alt="" />
          </div> :
          <Image height={500} width={500} src={image} alt="" />
      }

      <h4 className='text-4xl text-blue-600 font-medium'>{subTitle}</h4>
      <h2>{title}</h2>
    </div>
  )
}

export default BannerForCreating