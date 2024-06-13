import { FUND_RAISE_IMAGE_URL } from '@/app/_util/_const/const'
import React, { useState } from 'react'
import SliderComponent from './SliderComponent'
import ImageItem from './ImageItem'
import ImageModel from './ImageModel'

function ListImageFile({ data = [], BASE_PATH, onClose }) {

  let [currentImage, setCurrentImage] = useState(null)

  function onImageClose(image_id) {
    if (confirm("Are you sure want to delete this file?")) {
      onClose(image_id)
    }
  }

  return (
    <div>

      <ImageModel imageURL={currentImage} isOpen={currentImage} onImageClose={() => setCurrentImage(null)} />

      <div class="">

        <ul style={{ height: "186px", overflow: "auto" }}>
          {
            data.map((each) => {
              return (

                <li>
                  <div className='cursor-pointer mb-3' onClick={() => {
                    setCurrentImage(BASE_PATH + "/" + each)
                  }}
                  >
                    <ImageItem onClose={(e) => {
                      e.stopPropagation()
                      onImageClose(each)
                    }} imageName={each} imageURL={BASE_PATH + "/" + each}></ImageItem>
                  </div>
                </li>
                // <div className='h-56 '>
                //   <img src={BASE_PATH + "/" + each} className='w-full h-full rounded-md' style={{ width: "200px" }} alt="" />
                // </div>
                // <div class="relative bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                //   <img class="w-full h-auto rounded-xl" style={{ width: "200px" }} src={BASE_PATH + "/" + each} alt="Image Description" />
                //   <div class="absolute top-0 start-0 end-0">
                //     <div class="p-4 md:p-5">
                //       <h3 class="text-lg font-bold text-gray-800">
                //         Card title
                //       </h3>
                //       <p class="mt-1 text-gray-800">
                //         Some quick example text to build on the card title and make up the bulk of the card's content.
                //       </p>
                //       <p class="mt-5 text-xs text-gray-500 dark:text-neutral-500">
                //         Last updated 5 mins ago
                //       </p>
                //     </div>
                //   </div>
                // </div>
              )
            })
          }

        </ul>

      </div>

    </div >
  )

}

export default React.memo(ListImageFile)