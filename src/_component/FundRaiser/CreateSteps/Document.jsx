import React from 'react'
import CreateFormBackground from '../CreateFormBackground'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import UploadFilePlusButton from '@/_component/Util/UploadFilePlusButton'

function Document({state}) {
  return (
    <div className='mb-5'>
      <CreateFormBackground>
      <form>

        <div>
          <label htmlFor="">Select Picture's</label>
          <div className="flex mt-3">
            <div className='w-2/4'>
              <FileSelectBox>
                <input type="file" className='hidden' />
              </FileSelectBox>
            </div>
            <div className='w-1/4'>
              <UploadFilePlusButton />
            </div>
          </div>
        </div>

        <div className='mt-3'>
          <label htmlFor="">Select Document's</label>
          <div className="flex mt-3">
            <div className='w-2/4'>
              <FileSelectBox>
                <input type="file" className='hidden' />
              </FileSelectBox>
            </div>
            <div className='w-1/4'>
              <UploadFilePlusButton />
            </div>
          </div>
        </div>


        


<div className='ml-auto mt-5 w-full overflow-hidden gap-3 flex justify-end'>
          <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> state((prev)=> prev-1)}><i class="fa-solid fa-chevron-left"></i> Prev </button>
          <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> state((prev)=> prev+1)}>Next <i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </form>

    </CreateFormBackground>
    </div>
  )
}

export default Document