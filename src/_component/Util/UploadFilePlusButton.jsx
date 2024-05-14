import React from 'react'

function UploadFilePlusButton() {
  return (
    <div>
    <div class=" items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center  pl-5 pr-5 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <i class="fa-solid fa-plus"></i>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Add new file</span></p>
             </div>
             
        </label>
    </div>

</div>
  )
}

export default UploadFilePlusButton