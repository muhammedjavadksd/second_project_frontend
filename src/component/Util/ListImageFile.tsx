import React, { useState } from 'react'
import ImageItem from './ImageItem'
import ImageModel from './ImageModel'
import { IListImageFile } from '@/util/types/InterFace/PropInterFace'

function ListImageFile({ data = [], BASE_PATH, onClose }: IListImageFile) {

  let [currentImage, setCurrentImage] = useState<string>(null)

  function onImageClose(image_id: string) {
    console.log(data);

    if (confirm("Are you sure want to delete this file?")) {
      onClose(image_id)
    }
  }



  return (
    <div>

      <ImageModel ZIndex='999' imageURL={currentImage} isOpen={currentImage != null} onImageClose={() => setCurrentImage(null)} />

      <div className="">

        <ul style={{ maxHeight: "186px", overflow: "auto" }}>
          {
            data.map((each) => {

              let image = BASE_PATH ? BASE_PATH + "/" + each : each
              return (

                <li>
                  <div className='cursor-pointer mb-3' onClick={() => {
                    setCurrentImage(image)
                  }}
                  >
                    <ImageItem onClose={(e) => {
                      e.stopPropagation()
                      onImageClose(each)
                    }} imageName={each} imageURL={image}></ImageItem>
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