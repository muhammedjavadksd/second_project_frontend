import React from 'react'
 
function BannerForCreating({image, title,subTitle}) {
  return (
    <div className='flex items-center justify-center flex-col mb-10'>
      <img height={"500px"} width={"500px"} src={image} alt="" />
      <h4 className='text-4xl text-blue-600 font-medium'>{subTitle}</h4>
      <h2>{title}</h2>
    </div>
  )
}

export default BannerForCreating