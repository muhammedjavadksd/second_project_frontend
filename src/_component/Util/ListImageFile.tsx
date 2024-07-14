import React, { useState } from 'react'
import ImageItem from './ImageItem'
import ImageModel from './ImageModel'
import { IListImageFile } from '@/types/InterFace/PropInterFace'

function ListImageFile({ data = [], BASE_PATH, onClose }: IListImageFile) {

  let [currentImage, setCurrentImage] = useState<string>(null)

  function onImageClose(image_id: string) {
    if (confirm("Are you sure want to delete this file?")) {
      onClose(image_id)
    }
  }



  return (
    <div>

      <ImageModel ZIndex='999' imageURL={currentImage} isOpen={currentImage != null} onImageClose={() => setCurrentImage(null)} />

      <div className="">

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
              )
            })
          }

        </ul>

      </div>

    </div >
  )

}

export default React.memo(ListImageFile)