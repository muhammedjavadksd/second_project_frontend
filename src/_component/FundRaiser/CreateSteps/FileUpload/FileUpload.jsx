import React, { useContext, useRef } from 'react'
import CreateFormBackground from '../../CreateFormBackground'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import UploadFilePlusButton from '@/_component/Util/UploadFilePlusButton'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { onFileUpload } from './Logic';
import { OnGoingApplicationContext } from '@/app/_util/context/Context';

function FileUpload({ state }) {

  let imageRef = useRef(null);
  let documentRef = useRef(null);


  let { currentApplication, setApplication } = useContext(OnGoingApplicationContext)
  let router = useRouter();

  function onSuccess() {
    toast.success("Image uploaded successs")
  }

  function onError(err) {
    toast.error(err)
  }

  function ifNotLogged() {
    router.replace("/auth/sign_in")
  }

  return (
    <div className='mb-5'>
      <CreateFormBackground>


        <div>
          <label htmlFor="">Select Picture's</label>
          <div className="flex mt-3">
            <div className='w-2/4'>
              <div

                onClick={() => imageRef.current.click()}>
                <FileSelectBox>
                  <input ref={imageRef} accept='image/png, image/jpeg, image/jpg' type="file" onChange={(e) => {
                    onFileUpload(e.target.files[0], onSuccess, onError, ifNotLogged, "Pictures", currentApplication)
                    e.target.files = []
                  }} className='hidden' />
                </FileSelectBox>
              </div>
            </div>
            <div className='w-1/4'>
              {/* <UploadFilePlusButton /> */}
            </div>
          </div>
        </div>

        <div className='mt-3'>
          <label htmlFor="">Select Document's</label>
          <div className="flex mt-3">
            <div className='w-2/4'>
              <div
                onClick={() => documentRef.current.click()}>
                <FileSelectBox>
                  <input ref={documentRef} accept='image/png, image/jpeg, image/jpg' type="file" onChange={(e) => {
                    onFileUpload(e.target.files[0], onSuccess, onError, ifNotLogged, "Documents", currentApplication)
                    e.target.files = []
                  }} className='hidden' />
                </FileSelectBox>
              </div>
            </div>
            <div className='w-1/4'>
              {/* <UploadFilePlusButton /> */}
            </div>
          </div>
        </div>


        <div className='ml-auto mt-5 w-full overflow-hidden gap-3 flex justify-end'>
          <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev - 1)}><i class="fa-solid fa-chevron-left"></i> Prev </button>
          <button type="button" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => state((prev) => prev + 1)}>Next <i class="fa-solid fa-chevron-right"></i></button>
        </div>


      </CreateFormBackground >
    </div >
  )
}

export default FileUpload